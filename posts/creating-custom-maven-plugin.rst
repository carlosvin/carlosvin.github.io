.. title: Example how to create custom Maven Plugin
.. slug: creating-custom-maven-plugin
.. date: 2018/03/11 19:00:00
.. tags: Maven, Java, Build Systems, maven-site-plugin
.. description: Example to understand Maven plugins concepts and how to create a custom Maven plugin from scratch
.. type: text

Maven has lot of plugins to assist you in you project construction and deployment. For example if you want to compile C++ code instead of Java, you can use `native-maven-plugin <http://www.mojohaus.org/maven-native/native-maven-plugin/>`_ . But what if you need something more specific? Then you can create a custom Maven plugin. 

I will explain how to create a simple custom maven plugin to generate static blog site from Markdown files. I know we can already do that with `maven-site-pugin <https://maven.apache.org/plugins/maven-site-plugin/examples/creating-content.html>`_ since version 3.3, I will just use it for learning purposes.  

You can find whole source code example at https://github.com/carlosvin/blog-maven-plugin.

.. contents::

.. TEASER_END

Maven plugin concepts
=====================

Mojo_
    An executable goal in Maven, e.g: ``mvn your-plugin:your-mojo`` will execute a maven goal ``your-mojo`` declared as part of ``your-plugin``. 

Goal
    It matches with `Mojo <http://maven.apache.org/plugin-developers/index.html>`_ execution

Lifecycle
    It is a well defined sequence of phases. Each phase consists of a sequence of goals.
    Let's see an example of lifecycle, e.g: ``FooLifecycle`` has ``clean``, ``prepare`` and ``assemble`` phases. Each of those phases has one of more goals. **FooLifecycle**:
    
    - clean
        - **rmSources**: a goal to remove source files
        - **rmBuild**: a goal to remove files in cache directory 
    - prepare
        - **installDependencies**: a goal to download dependencies for the project
    - assemble
        - **build**: a goal to compile source files

    To define a custom lifecycle as previous we will use ``src/main/resources/META-INF/plexus/components.xml``, we will speak about that file in following sections.
    Normally is enough to override `predefined lifecycles <https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html>`_, in this example we will override site lifecycle.

.. hint:: You can find an introduction to Maven lifecycles at https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html


Create your custom plugin
=========================

In this example we will create a plugin to `override site lifecycle <https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#site_Lifecycle>`_, which has only 2 default phases, so when we run `mvn site` using our new custom plugin it will execute the goals we are about to create. 

Our plugin will work with `md` file bindings: It will build the project and deploy it using `default maven deployment plugin <http://maven.apache.org/plugins/maven-deploy-plugin/>`_.


Project structure
-----------------

``src/main/java``
    Where Java source code is

``src/main/resources/META-INF/plexus/components.xml``
    file to create/override maven lifecycles and artifact types. Here we can especify which goals will be executed when for an artifact type, for example, we can say that for an artifact of type ``whatever`` when we run ``mvn foo`` it will verify the files, run tests, run linter, compile and zip al generated files.

``src/test/java``
    Unit tests folder
    
``src/it``
    Folder with all integration tests. Those integration tests are running actual projects and checking that ouputs are as expected.
    
``pom.xml``
    File to with Maven project description `(Project Object Model) <https://maven.apache.org/guides/introduction/introduction-to-the-pom.html>`_


Dependency Injection (`Maven JSR-330 <https://maven.apache.org/maven-jsr330.html>`_)
-------------------------------------------------------------------------------------

Maven has finally chosen `JSR-330 <http://javax-inject.github.io/javax-inject/>`_ as dependency injection standard (previously it was Plexus Annotations API).

To use dependency injection with Maven we have to: 

1. Add ``javax.inject`` dependency to ``pom.xml`` so we can use ``@Inject``, ``@Named``, and ``@Singleton`` annotations in plugin implementation Java code.

.. code:: xml

    <dependency>
        <groupId>javax.inject</groupId>
        <artifactId>javax.inject</artifactId>
        <version>1</version>
    </dependency>

2. Setup the sisu-maven-plugin to index the JSR-330 components you want made available to Maven.

.. code:: xml

    <plugin>
        <groupId>org.eclipse.sisu</groupId>
        <artifactId>sisu-maven-plugin</artifactId>
        <version>0.3.3</version>
        <executions>
            <execution>
                <id>generate-index</id>
                <goals>
                    <goal>main-index</goal>
                </goals>
            </execution>
        </executions>
    </plugin>

3. Use annotations in your Mojo, e.g:

.. code:: java

    // This annotation is not a dependency injection one, we will explain later what it is for
    @Mojo(name = "build", defaultPhase = LifecyclePhase.COMPILE)
    public class BuildMojo extends AbstractMojo {

        private final FileSetManager fileSetManager;
        private final MdToHtml mdToHtml;

        // It will inject an instance of FileSetManager and MdToHtml
        @Inject
        public BuildMojo(FileSetManager fileSetManager, MdToHtml mdToHtml) {
            this.fileSetManager = fileSetManager;
            this.mdToHtml = mdToHtml;
        
Write a custom Mojo_
--------------------

It is straight forward to implement a Mojo_ class, we have to:

1. Make your Mojo_ class to implement ``org.apache.maven.plugin.Mojo``, altouth it is more convenient to extend ``org.apache.maven.plugin.AbstractMojo`` which takes care of logging. That interface and class are described at `Mojo API`_.

.. code:: java

    public class BuildMojo extends AbstractMojo {

2. Annotate Mojo_ class with ``@Mojo`` and input parameters with ``@Parameter``. Those annotations belog to other set of annotations to configure Mojos, `Plugin Tools Java5 Annotations <https://maven.apache.org/plugin-tools/maven-plugin-plugin/examples/using-annotations.html>`_.

.. code:: java
    :name: BuildMojo.java

    /**
    * Generate HTML files from Markdown files
    */
    @Mojo(name = "build", defaultPhase = LifecyclePhase.COMPILE)
    public class BuildMojo extends AbstractMojo {

        /**
        * Output direcotry path where HTML files are generated
        */
        @Parameter(defaultValue = "${project.reporting.outputDirectory}", property = "siteOutputDirectory", required = true)
        private File outputDirectory;

        /**
        * A specific <code>fileSet</code> rule to select files and directories.
        * Fileset spec: https://maven.apache.org/shared/file-management/fileset.html
        */
        @Parameter
        private FileSet inputFiles;

``@Mojo``
    Configures Mojo name and default lifecycle phase. To execute the Mojo in example we will use ``mvn site:build``: ``site`` is plugin name and ``build`` is ``name`` parameter.

``@Parameter``
    We use it to pass configuration parameters to Mojo. ``@Parameter`` annotation accepts extra arguments

    - defaultValue: You can use properties placeholder or any String. If parameter type declared is not a String, then Maven will try to converted it, e.g: 
    
    .. code:: java 

        // If intParameter is not set in pom file, then "2" will be converted to 2 and assigned to intParameter.        
        @Parameter(defaultValue="2") 
        Integer intParameter;
    
    
    - property: It allows configuration of the mojo parameter from the command line by referencing a system property that the user sets via the -D option. 

    .. code:: bash 
        
        # To assign "/var/www/html" value to  outputDirectory:

        mvn site:build -DsiteOutputDirectory=/var/www/html

        

    More info in `Maven Plugin development guide in Parameter section <https://maven.apache.org/guides/plugin/guide-java-plugin-development.html#Parameters>`_.

Work in progress...

.. _Mojo: http://maven.apache.org/plugin-developers/index.html
.. _`Mojo API`: https://maven.apache.org/developers/mojo-api-specification.html