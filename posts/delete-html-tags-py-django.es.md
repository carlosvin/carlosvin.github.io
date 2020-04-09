---
title: Eliminar etiquetas HTML
date: 2012/10/02 11:30:00
tags: Python, Django, HTML
description: Cómo eliminar etiquetas HTML utilizando Python o más fácil aún, utilizando Django.
type: text
lang: es
---


[Python](https://www.python.org/)
=================================

Función encargada de eliminar las etiquetas HTML:

``` {.python}
#main.py

import re

def strip_tags(value):
    return re.sub(r'<[^>]*?>', '', value)
```

Suponiendo que tenemos el siguiente HTML

``` {.html}
<!DOCTYPE HTML>
<html>
    <head>
        <title>Title</title>
    </head>
    <body>
        <p>Paragraph</p>
    </body>
</html>
```

Vamos a hacer una prueba pasandolo como parámetro de la función
strip\_tags:

``` {.python}
#main.py

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

print strip_tags(html_text)
```

Si ejecutamos el script tenemos como resultado:

``` {.bash}
Title

Paragraph
```

Y si con [Python](https://www.python.org/) ha sido fácil, vamos a ver
con [Django](https://www.djangoproject.com/:lang:%20es)

[Django](https://www.djangoproject.com/:lang:%20es)
===================================================

``` {.python}
#main.py

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

print strip_tags( html_text )
```

Mucho más sencillo, porque la función ya está escrita.
