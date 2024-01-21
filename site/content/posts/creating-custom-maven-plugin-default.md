# Custom Maven Plugin: Override default build lifecycle

I explained in previous article [Example how to create custom Maven Plugin](/posts/creating-custom-maven-plugin) which [overrides site lifecycle](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#site_Lifecycle).

I have created another example to demonstrate how to override [default Maven build lifecycle](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#default_Lifecycle). Default build lifecycle is used to construct your software project, for example, it is executed when you run `mvn install` in a `jar` type project.

You can find source code example at https://github.com/carlosvin/lifecycle-maven-plugin.

**💡 TIP**\
I’ve also created an [archetype,window=_blank](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html) so you can easily play with the example.

## Create an example project

**Generate the project using archetype**

```bash
mvn archetype:generate \
  -DarchetypeGroupId=com.github.carlosvin.archetype \
  -DartifactId=lifecycle-maven-plugin-archetype \
  -DarchetypeVersion=0.6
```
