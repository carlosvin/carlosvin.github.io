# Eliminar etiquetas HTML

A continuación veremos cómo eliminar las etiquetas HTML de una cadena de caracteres.

## Con https://www.python.org[Python]

Función encargada de eliminar las etiquetas HTML:

**main.py**

```python
import re

def strip_tags(value):
    return re.sub(r'<[^>]*?>', '', value)
```

Vamos a hacer una prueba un fragmento de HTML a la función `strip_tags`:

**main.py**

```python
import re

def strip_tags(value):
    return re.sub(r'<[^>]*?>', '', value)

html_text = """
    <!DOCTYPE HTML>
    <html>
        <head>
            <title>Title</title>
        </head>
        <body>
            <p>Paragraph</p>
        </body>
    </html>"""

print(strip_tags(html_text))
```

Si ejecutamos el script tenemos como resultado:

```bash
Title

Paragraph
```

Si con [Python](https://www.python.org) ha sido fácil, vamos a ver con [Django](https://www.djangoproject.com).

## https://www.djangoproject.com[Django]

[Django](https://www.djangoproject.com) una ofrece función para esto: [strip_tags](https://docs.djangoproject.com/en/3.0/ref/utils/#django.utils.html.strip_tags).

Antes, solo hay que instalar la librería: `pip install django`.

**main.py**

```python
from django.utils.html import strip_tags

html_text = """
    <!DOCTYPE HTML>
    <html>
        <head>
            <title>Title</title>
        </head>
        <body>
            <p>Paragraph</p>
        </body>
    </html>"""

print (strip_tags(html_text))
```
