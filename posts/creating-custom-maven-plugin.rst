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
    It is equivalent to `Mojo <http://maven.apache.org/plugin-developers/index.html>`_ execution

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
    Folder with all integration tests. Those integration tests are running actual projects and checking that outputs are as expected.
    
``pom.xml``
    File to with Maven project description `(Project Object Model) <https://maven.apache.org/guides/introduction/introduction-to-the-pom.html>`_


Dependency Injection
--------------------

Maven has finally chosen `JSR-330 <https://maven.apache.org/maven-jsr330.html>`_ as `dependency injection standard <http://javax-inject.github.io/javax-inject/>`_ (previously it was Plexus Annotations API).

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

It is straightforward to implement a Mojo_ class, we have to:

1. Implement Mojo interface
###########################

Your Mojo_ class has to implement ``org.apache.maven.plugin.Mojo``, altouth it is more convenient to extend ``org.apache.maven.plugin.AbstractMojo``, an abstract class to provide most of the infrastructure required to implement a Mojo except for the execute method. That interface and class are described at `Mojo API`_.

.. code:: java

    public class BuildMojo extends AbstractMojo {

2. Configure Mojo with Java 5 annotations
#########################################

Annotate Mojo_ class with ``@Mojo`` and input parameters with ``@Parameter``. Those annotations belong to other set of annotations to configure Mojos, `Plugin Tools Java5 Annotations <https://maven.apache.org/plugin-tools/maven-plugin-plugin/examples/using-annotations.html>`_.

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

.. hint:: More info in `Maven Plugin development guide in Parameter section <https://maven.apache.org/guides/plugin/guide-java-plugin-development.html#Parameters>`_.

3. Implement execute method
############################

As I have explained before at `1. Implement Mojo interface`_, our Mojo_ class extends ``org.apache.maven.plugin.AbstractMojo`` which has one unimplemented method from ``org.apache.maven.plugin.Mojo`` interface. In that method we are going to implement the Maven goal logic.

Mojo_ class instance is called from Maven_ execution lifecycle by invoking ``execute()`` method. Before calling ``execute()`` Maven has performed some other tasks related with the Mojo: 

1. Maven instantiates Mojo and injects dependencies (`Dependency Injection`_).
 
.. code:: java

    Mojo mojo = new BuildMojo(fileSetManager, mdToHtml);

2. Maven configures the Mojo by assigning values to parameters. 

3. Maven calls execute method: ``mojo.execute();``.

I will simplify ``execute`` method implementation, the `example project in github <https://github.com/carlosvin/blog-maven-plugin>`_ is more complicated and not good for learning.

.. code:: java

    // If there is any error during execution it should throw MojoExecutionException
    public void execute() throws MojoExecutionException {
        if (inputFiles == null) {
            setDefaultInput();
        }
        inputDirPath = Paths.get(inputFiles.getDirectory());

        // A way to get all selected files from FileSet
        // https://maven.apache.org/shared/file-management/fileset.html
        String[] includedFiles = fileSetManager.getIncludedFiles(inputFiles);

        outputDirPath = outputDirectory.toPath();
        if (includedFiles == null || includedFiles.length == 0) {
            // AbstractMojo supplies logger functionality
            getLog().warn("SKIP: There are no input files. " + getInputFilesToString());
        } else {
            // If output directory doesn't exist, it will be created
            if (!outputDirectory.exists()) {
                outputDirectory.mkdirs();
            }
            try {
                for (String f : includedFiles) {
                    // it converts each file Markdown to HTML 
                    convertToHtml(Paths.get(f), outputDirectory);
                }
            } catch (InterruptedException e) {
                // Convert thrown exception to MojoExecutionException
                throw new MojoExecutionException(e.getLocalizedMessage(), e);
            }
        }
    }


Unit tests
==========

In the example we use `JUnit 4`_, but you can use any other testing framework. 

Firtsly you have to add the unit test library dependency to ``pom.xml``.

.. code:: xml

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.11</version>
        <scope>test</scope>
    </dependency>

Then you just have to write your unit tests under ``src/test/java`` folder, for example: `src/test/java/com/maven/plugins/blog/PathsTest.java <https://github.com/carlosvin/blog-maven-plugin/blob/master/src/test/java/com/maven/plugins/blog/PathsTest.java>`_.

To run unit tests you just need to execute ``mvn test``.

Interation tests
================

The 2 most popular ways to perform integration tests on custom maven plugins are using maven-failsafe-plugin_ or maven-invoker-plugin_.

I've chosen maven-invoker-plugin_ because for me it is more straightforward. There is `an answer at stackoverflow where they explain thorogly the differences between them <https://stackoverflow.com/questions/40010745/maven-invoker-plugin-vs-maven-failsafe-plugin-which-to-use-for-integration-test>`_

How does Invoker Pluing work?
-----------------------------

We create projects to use our custom plugin under ``src/it`` folder, so our plugin will be applied to test projects. After that a validation script will be executed so we can check if our plugin outputs are as expected. For example, if our plugin is suppose to generate a file named ``foo.file``, verification plugin will check if that file exists, if it doesn't, integration test will fail. 

Configure Invoker Plugin
------------------------

.. code:: xml

    <plugin>
        <artifactId>maven-invoker-plugin</artifactId>
        <version>3.0.1</version>
        <configuration>
            <postBuildHookScript>verify</postBuildHookScript>
            <showVersion>true</showVersion>
            <streamLogs>true</streamLogs>
            <noLog>false</noLog>
            <showErrors>true</showErrors>
        </configuration>
        <executions>
            <execution>
                <id>integration-test</id>
                <goals>
                    <goal>install</goal>
                    <goal>run</goal>
                </goals>
            </execution>
        </executions>
    </plugin>

In **executions** section we execute following goals:
 
1. ``invoker:install`` will be executed during the phase pre-integration-test and will install main project artifact into target/local-repo.
2. ``invoker:run`` will be executed during the integration-test phase and it will execute all defined integration tests under ``src/it`` folder.

In **configuration** section:

``<postBuildHookScript>verify</postBuildHookScript>``
Execute validation script after integration test execution. This script may be written with either BeanShell or Groovy.

We have used other properties to show errors, show maven log and save it to a file.

You can check all ``invoker:run`` configuration properties at https://maven.apache.org/plugins/maven-invoker-plugin/run-mojo.html. 

Create an Integration Test Project
----------------------------------

There are 3 important files, those match with AAA_ pashes ("Arrange-Act-Assert"):

- `src/it/md-html/pom.xml [Arrange] <https://github.com/carlosvin/blog-maven-plugin/blob/master/src/it/md-html/pom.xml>`_ which has the project using our custom plugin.
- `src/it/md-html/invoker.properties [Act] <https://github.com/carlosvin/blog-maven-plugin/blob/master/src/it/md-html/invoker.properties>`_ will define how test project will be executed, for which goals.
- `src/it/md-html/verify.groovy [Assert] <https://github.com/carlosvin/blog-maven-plugin/blob/master/src/it/md-html/verify.groovy>`_ is the script to check that plugin execution generated expected results. 

pom.xml (Arrange)
#################

.. code:: xml
    
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>

        <groupId>com.maven.plugins.it</groupId>
        <artifactId>simple-it</artifactId>
        <version>1.0-SNAPSHOT</version>

        <build>
            <plugins>
                <plugin>
                    <groupId>@project.groupId@</groupId>
                    <artifactId>@project.artifactId@</artifactId>
                    <version>@project.version@</version>
                </plugin>
            </plugins>
        </build>
    </project>

It is a very simple pom file where we use placeholders to reference to our plugin under test. When invoker plugin executes following pom file, firstly will replace those placeholders to reference to latest version of our custom plugin which was recently installed in local repository:

.. code:: xml

    <plugin>
        <groupId>com.maven.plugins</groupId>
	    <artifactId>blog</artifactId>
	    <version>0.0.1-SNAPSHOT</version>
    </plugin>

In that way invoker plugin ensures it is testing latest version of current project.

invoker.properties (Act)
########################

.. code:: properties

    invoker.goals = blog:build
    invoker.name = Test build MD


It will execute ``mvn blog:build``, a goal defined in our custom plugin under example or what is the same, it will execute BuildMojo_ described at section `Write a custom Mojo`_.

verify.groovy (Assert)
######################

.. code:: groovy

    File generated = new File( basedir, "target/site/README.html" );

    assert generated.isFile()

It is checking if ``target/site/README.html`` file was generated by plugin.

We can consider this verification script as **assert** phase in testing AAA_.

.. _Maven: http://maven.apache.org
.. _Mojo: http://maven.apache.org/plugin-developers/index.html
.. _`Mojo API`: https://maven.apache.org/developers/mojo-api-specification.html
.. _`JUnit 4`: https://junit.org/junit4/
.. _maven-failsafe-plugin: https://maven.apache.org/surefire/maven-failsafe-plugin
.. _maven-invoker-plugin: https://maven.apache.org/plugins/maven-invoker-plugin
.. _BuildMojo: https://github.com/carlosvin/blog-maven-plugin/blob/master/src/main/java/com/maven/plugins/blog/BuildMojo.java
.. _AAA: http://wiki.c2.com/?ArrangeActAssert
