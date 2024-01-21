# Crear un plugin para Maven: default lifecycle

Ya expliqué en el articulo [cómo crear un plugin para Maven](/posts/creating-custom-maven-plugin) which [que sobrescribe el ciclo de vida "site"](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#site_Lifecycle).

He creado otro ejemplo que demuestra cómo sobrescribir [el ciclo de via que utliza Maven por defecto](https://maven.apache.org/ref/3.5.3/maven-core/lifecycles.html#default_Lifecycle). Éste es utilizado para construir, probar, empaquetar y distribuir un proyecto software, por ejemplo, estamos utilizando el ciclo de vida por defecto cuando ejecutamos `mvn install` en un proyecto del tipo `jar`.

Puedes encontrar el código fuente del ejemplo en https://github.com/carlosvin/lifecycle-maven-plugin.

**💡 TIP**\
También he creado un [arquetipo (archetype),window=_blank](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html) de forma que fácilmente puedes probar el ejemplo.

## Generar un proyecto de ejemplo

**Generar un proyecto utilizando el arquetipo**

```bash
mvn archetype:generate \
  -DarchetypeGroupId=com.github.carlosvin.archetype \
  -DartifactId=lifecycle-maven-plugin-archetype \
  -DarchetypeVersion=0.6
```
