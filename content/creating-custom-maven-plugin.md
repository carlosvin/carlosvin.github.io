---
title: Example how to create custom Maven Plugin
date: 2018-03-11
lang: en
keywords: Maven, Java, Build Systems, maven-site-plugin, Maven Plugins
description: Example to understand Maven plugins concepts and how to create a custom Maven plugin from scratch
toc: true
aliases: ["/langs/en/posts/creating-custom-maven-plugin", "/langs/es/posts/creating-custom-maven-plugin"]
---

[Maven](https://maven.apache.org) has lots of plugins to assist you in project construction, testing, packaging and deployment. For example if you want to compile C++ code instead of Java, you can use [native-maven-plugin](https://www.mojohaus.org/maven-native/native-maven-plugin/). But what if you need something more specific? Then you can create a custom Maven plugin.

I will explain how to create a simple custom maven plugin to generate static blog site from Markdown files. I know we can already do that with [maven-site-plugin](https://maven.apache.org/plugins/maven-site-plugin/examples/creating-content.html) since version 3.3, I will just use it for learning purposes.

You can find the source code of this example at [https://github.com/carlosvin/blog-maven-plugin](https://github.com/carlosvin/blog-maven-plugin).

## Maven plugin concepts

**Mojo:** An executable goal in Maven, e.g: `mvn your-plugin:your-mojo` will execute a maven goal `your-mojo` declared as part of `your-plugin`.

**Goal:** It is equivalent to Mojo execution.

**Lifecycle:** It is a well-defined sequence of phases. Each phase consists of a sequence of goals. Let's see an example of lifecycle, e.g: `FooLifecycle` has `clean`, `prepare` and `assemble` phases. Each of those phases has one of more goals. *FooLifecycle*:

- clean:
  - rmSources: a goal to remove source files
  - rmBuild: a goal to remove files in cache directory
- prepare:
  - installDependencies: a goal to download dependencies for the project
- assemble:
  - build: a goal to compile source files

To define a custom life-cycle similar to previous one, we will use `src/main/resources/META-INF/plexus/components.xml`, we will speak about that file in following sections. Normally is enough to override [predefined lifecycles](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html), in this example, we will override *site life-cycle*.

> **Tip:** You can find an introduction to Maven life-cycles at [Maven life-cycle guide](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html)

## Create your custom plugin (Site Lifecycle)

The plugin we are about to explain will [override site lifecycle](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#site_Lifecycle), which has only 2 default phases, so when we run `mvn site` using our new custom plugin it will execute the goals we are about to create.

Our plugin will work with `md` (for [Markdown](https://commonmark.org/)) file bindings: It will build and deploy the project using [maven deployment plugin](https://maven.apache.org/plugins/maven-deploy-plugin/).

### Project structure

- `src/main/java`: Where Java source code is
- `src/main/resources/META-INF/plexus/components.xml`: file to create/override maven lifecycles and artifact types. Here we can specify which goals will be executed when for an artifact type, for example, we can say that for an artifact of type `whatever` when we run `mvn foo` it will verify the files, run tests, run linter, compile and zip all generated files.
- `src/test/java`: Unit tests folder.
- `src/it`: Folder with all integration tests. Those integration tests are running actual projects and checking that outputs are as expected.
- `pom.xml`: File with Maven project description ([Project Object Model](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html))

### Dependency Injection

Maven has finally chosen [JSR-330](https://maven.apache.org/maven-jsr330.html) as [dependency injection standard](https://javax-inject.github.io/javax-inject/) (previously it was Plexus Annotations API).

To use dependency injection with Maven we have to:

Add `javax.inject` dependency to `pom.xml`, so we can use `@Inject`, `@Named`, and `@Singleton` annotations in plugin implementation Java code.

### pom.xml (Dependency)

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

Set up the `sisu-maven-plugin` to index the JSR-330 components you want made available to Maven.

### pom.xml (Plugin)

```xml
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
```

Add annotations to your Mojo, e.g:

### BuildMojo.java (Dependency Injection)

```java
@Mojo(name = "build", defaultPhase = LifecyclePhase.COMPILE) // <1>
public class BuildMojo extends AbstractMojo {

    private final FileSetManager fileSetManager;
    private final MdToHtml mdToHtml;

    @Inject // <2>
    public BuildMojo(FileSetManager fileSetManager, MdToHtml mdToHtml) {
        this.fileSetManager = fileSetManager;
        this.mdToHtml = mdToHtml;
        //
    }
}
```

1. This annotation is not a dependency injection one, we will explain later what it is for.
2. It will inject an instance of FileSetManager and MdToHtml.

### Write a custom Mojo

It is quite straightforward to implement a Mojo class, we have to:

#### 1. Implement Mojo interface

Your Mojo class has to implement `org.apache.maven.plugin.Mojo`, although it is more convenient to extend `org.apache.maven.plugin.AbstractMojo`, an abstract class to provide most of the infrastructure required to implement a Mojo except for execute method. That interface and class are described at [Mojo API](https://maven.apache.org/developers/mojo-api-specification.html).

```java
public class BuildMojo extends AbstractMojo { 
    // ...
}
```

#### 2. Configure Mojo with Java 5 annotations

Annotate Mojo class with `@Mojo` and input parameters with `@Parameter`. Those annotations belong to another set of annotations to configure Mojos, [Plugin Tools Java5 Annotations](https://maven.apache.org/plugin-tools/maven-plugin-plugin/examples/using-annotations.html).

```java
/**
* Generate HTML files from Markdown files
*/
@Mojo(name = "build", defaultPhase = LifecyclePhase.COMPILE) // <1>
public class BuildMojo extends AbstractMojo {

    /**
    * Output directory path where HTML files are generated
    */
    @Parameter( // <2>
      defaultValue = "${project.reporting.outputDirectory}", // <3>
      property = "siteOutputDirectory", // <4>
      required = true) 
    private File outputDirectory;

    /**
    * A specific <code>fileSet</code> rule to select files and directories.
    * Fileset spec: https://maven.apache.org/shared/file-management/fileset.html
    */
    @Parameter
    private FileSet inputFiles;
    // 
}
```

1. Configures Mojo name and default life-cycle phase. To execute the Mojo in this example we will use `mvn site:build`: *site* is the plugin name and *build* is `name` parameter.
2. We use `@Parameter` annotation to pass configuration parameters to Mojo.
3. You can use properties placeholder or any String. If the parameter type is not a String, then Maven will try to cast it.
4. It allows configuration of the Mojo parameter from the command line by referencing a system property that the user sets via the -D option. E.g: `mvn site:build -DsiteOutputDirectory=/var/www/html` will set siteOutputDirectory attribute to `/var/www/html`.

> **Tip:** More info in [Maven Plugin development guide in Parameters section](https://maven.apache.org/guides/plugin/guide-java-plugin-development.html#Parameters).

#### 3. Implement *execute* method

As I have explained before at **1. Implement Mojo interface**, our Mojo class extends `org.apache.maven.plugin.AbstractMojo` which has one unimplemented method from `org.apache.maven.plugin.Mojo` interface. In that method we are going to implement the Maven goal logic.

Mojo class instance is called from Maven execution life-cycle by invoking `execute()` method. Before calling `execute()`, Maven has performed some other tasks related with the Mojo:

Maven instantiates Mojo and injects dependencies (see **Dependency Injection** section).

```java
Mojo mojo = new BuildMojo(fileSetManager, mdToHtml);
```

Maven configures the Mojo by assigning values to parameters.

I will simplify `execute` method implementation in the [sample project in github](https://github.com/carlosvin/blog-maven-plugin), because it is more complicated and this complexity is not relevant for learning purposes.

Maven calls execute method: `mojo.execute()`.

### BuildMojo.java (Execute Method)

```java
public void execute() throws MojoExecutionException { // <1>
    if (inputFiles == null) {
        setDefaultInput();
    }
    inputDirPath = Paths.get(inputFiles.getDirectory());

    String[] includedFiles = fileSetManager.getIncludedFiles(inputFiles); // <2>

    outputDirPath = outputDirectory.toPath();
    if (includedFiles == null || includedFiles.length == 0) {
        getLog().warn("SKIP: There are no input files. " + getInputFilesToString()); // <3>
    } else {
        if (!outputDirectory.exists()) { // <4>
            outputDirectory.mkdirs();
        }
        try {
            for (String f : includedFiles) {
                convertToHtml(Paths.get(f), outputDirectory); // <5>
            }
        } catch (InterruptedException e) {
            throw new MojoExecutionException(e.getLocalizedMessage(), e); // <6>
        }
    }
}
```

1. If there is any error during execution, it should throw MojoExecutionException.
2. A way to get all selected files from [FileSet](https://maven.apache.org/shared/file-management/fileset.html).
3. AbstractMojo supplies logger functionality.
4. If output directory doesn't exist, it will be created.
5. It converts each file Markdown to HTML.
6. Convert thrown exception to MojoExecutionException.

## Unit tests

In the example we use [JUnit 4](https://junit.org/junit4/), but you can use any other testing framework.

Firstly, you have to add the unit test library dependency to `pom.xml`.

### pom.xml

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
</dependency>
```

Then you just have to write your unit tests under `src/test/java` folder: [src/test/java/com/maven/plugins/blog/PathsTest.java](https://github.com/carlosvin/blog-maven-plugin/blob/master/src/test/java/com/maven/plugins/blog/PathsTest.java).

To run the unit tests you just need to execute `mvn test`.

## Integration tests

The 2 most popular ways to perform integration tests on custom maven plugins are using [maven-failsafe-plugin](https://maven.apache.org/surefire/maven-failsafe-plugin) or [maven-invoker-plugin](https://maven.apache.org/plugins/maven-invoker-plugin).

I've chosen maven-invoker-plugin because for me it is more straightforward. There is [an answer at stackoverflow where they explain thoroughly the differences between them](https://stackoverflow.com/questions/40010745/maven-invoker-plugin-vs-maven-failsafe-plugin-which-to-use-for-integration-test).

### How does Invoker Plugin work?

1. We create projects to use our custom plugin under `src/it` folder, so our plugin will be applied to test projects.
2. Invoker plugin will simulate a previously configured Maven execution.
3. After Maven execution, a validation script will check if our plugin outputs are the expected ones. For example, if our plugin is supposed to generate a file named `foo.file`, verification plugin will check if that file exists, if it doesn't, integration test will fail.

### Configure Invoker Plugin

```xml
<plugin>
    <artifactId>maven-invoker-plugin</artifactId>
    <version>3.0.1</version>
    <configuration>
        <postBuildHookScript>verify</postBuildHookScript> <!-- 3 -->
        <showVersion>true</showVersion>
        <streamLogs>true</streamLogs>
        <noLog>false</noLog>
        <showErrors>true</showErrors>
    </configuration>
    <executions>
        <execution>
            <id>integration-test</id>
            <goals>
                <goal>install</goal> <!-- 1 -->
                <goal>run</goal> <!-- 2 -->
            </goals>
        </execution>
    </executions>
</plugin>
```

1. `invoker:install` will be executed during the phase pre-integration-test and will install the main project artifact into target/local-repo.
2. `invoker:run` will be executed during the integration-test phase and it will execute all defined integration tests under `src/it` folder.
3. It configures invoker plugin to execute validation script after integration test project execution. This script may be written with either BeanShell or Groovy (verify.groovy or verify.bsh).

We have used other properties to show errors, show maven log and save it to a file.

You can check all `invoker:run` configuration properties at [maven-invoker-plugin run-mojo](https://maven.apache.org/plugins/maven-invoker-plugin/run-mojo.html).

### Create an Integration Test Project

It is a project we use to execute custom plugin goals, so we can validate if it produces the expected output.

There are 3 important files matching with [AAA](http://wiki.c2.com/?ArrangeActAssert) phases ("Arrange-Act-Assert").

#### Arrange: pom.xml

This file is a project using our custom plugin.

[src/it/md-html/pom.xml](https://github.com/carlosvin/blog-maven-plugin/blob/master/src/it/md-html/pom.xml)

```xml
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
```

It is a very simple pom file where we use placeholders to reference to our plugin under test. When invoker plugin executes following pom file, firstly will replace those placeholders to reference to the latest version of our custom plugin which was recently installed in the local repository:

```xml
<plugin>
    <groupId>com.maven.plugins</groupId>
    <artifactId>blog</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</plugin>
```

In that way invoker plugin ensures it is testing the latest version of current project.

#### Act: invoker.properties

It configures how test project will be executed.

[src/it/md-html/invoker.properties](https://github.com/carlosvin/blog-maven-plugin/blob/master/src/it/md-html/invoker.properties)

```properties
invoker.goals = blog:build
invoker.name = Test build MD
```

It will execute `mvn blog:build`, a goal defined in our custom plugin under example or what is the same, it will execute BuildMojo described in section **Write a custom Mojo**.

#### Assert: verify.groovy

It is the script to check that plugin execution generated the expected results.

Verification script, it is checking if `target/site/README.html` file was generated by the plugin.

[src/it/md-html/verify.groovy](https://github.com/carlosvin/blog-maven-plugin/blob/master/src/it/md-html/verify.groovy)

```groovy
File generated = new File( basedir, "target/site/README.html" );

assert generated.isFile()
```
