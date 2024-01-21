# Convertir archivos en formato Windows a formato Unix

Si alguna vez has programado desde un entorno Windows para entornos Unix, seguramente habrás tenido este problema: Los archivos que instalas en tu entorno Unix tienen formato Windows.

Hay un forma bastante sencilla de convertir todos los archivos que tienes en un directorio de formato Windows a Unix.

```bash
find . -type f -print0 | xargs -0 dos2unix
```

Lo he sacado, como no, de https://stackoverflow.com/questions/11929461/how-can-i-run-dos2unix-on-an-entire-directory
