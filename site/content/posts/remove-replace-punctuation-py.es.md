# Eliminar/Reemplazar signos de puntuación en Python

A continuación muestro una forma de eliminar los signos de puntuación de una cadena de caractéres en Python. Los signos de puntuación son reemplazados por caracteres en blanco.

```python
import re, string

def remove_punctuation ( text ):
  return re.sub('[%s]' % re.escape(string.punctuation), ' ', text)
```

**Ejecutando un ejemplo**

```bash
>>> remove_punctuation ("El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.")
'El perro  de San Roque  no tiene rabo  ni nunca lo ha tenido '
```

Si queremos hacer la función más general, para reemplazar los signos de puntuación por cualquier otra cadena, simplemente hay que hacer la siguiente modificación en la función.

```python
import re, string

def replace_punctuation ( text, replace ):
  return re.sub('[%s]' % re.escape(string.punctuation), replace, text)
```

**Ejecutando el código de arriba:**

```bash
>>> replace_punctuation ("El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.", '[stop]')
'El perro[stop] de San Roque[stop] no tiene rabo[stop] ni nunca lo ha tenido[stop]'
```
