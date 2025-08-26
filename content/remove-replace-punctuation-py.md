---
title: Replace punctuation symbols in Python
date: 2012-10-23
lang: en
updated: 2012-05-09
keywords: Python, Tips and Tricks
description: An example of how to remove or replace punctuation symbols of a Python string
toc: true
aliases: ["/langs/en/posts/remove-replace-punctuation-py", "/langs/es/posts/remove-replace-punctuation-py"]
---

Below is an explanation of how to replace punctuation symbols with whitespace in Python.

```python
import re, string

def remove_punctuation(text):
    return re.sub('[%s]' % re.escape(string.punctuation), ' ', text)
```

**Calling the previous function:**

```python
>>> remove_punctuation("El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.")
```

**We will get this output:**

```python
'El perro  de San Roque  no tiene rabo  ni nunca lo ha tenido '
```

We could make the function a little bit more generic to replace punctuation symbols with any other string.

```python
import re, string

def replace_punctuation(text, replace):
    return re.sub('[%s]' % re.escape(string.punctuation), replace, text)
```

**Calling the function to replace punctuation symbols by "[stop]":**

```python
>>> replace_punctuation(
    "El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.",
    '[stop]')

# output
'El perro[stop] de San Roque[stop] no tiene rabo[stop] ni nunca lo ha tenido[stop]'
```
