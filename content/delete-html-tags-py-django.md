---
title: "Remove HTML Tags"
date: 2012-10-02T11:30:00
keywords: ["Python", "Django", "HTML"]
description: "How to remove HTML tags using Python or even easier, using Django"
lang: "en"
tags: ["python", "django", "html", "text-processing"]
---

Below we'll see how to remove HTML tags from a character string.

## With Python

Function responsible for removing HTML tags:

### main.py

```python
import re

def strip_tags(value):
    return re.sub(r'<[^>]*?>', '', value)
```

Let's test an HTML fragment with the `strip_tags` function:

### Example usage

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

If we run the script we get the following result:

```bash
Title

Paragraph
```

If it was easy with [Python](https://www.python.org), let's see how it works with [Django](https://www.djangoproject.com).

## Django

[Django](https://www.djangoproject.com) offers a function for this: [`strip_tags`](https://docs.djangoproject.com/en/3.0/ref/utils/#django.utils.html.strip_tags).

First, you just need to install the library: `pip install django`.

### Using Django's strip_tags

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

print(strip_tags(html_text))
```
