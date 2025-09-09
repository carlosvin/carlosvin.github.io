---
title: "Text Normalization in Python"
date: 2012-10-02T18:00:00
keywords: ["Python", "Tips and Tricks"]
description: "Avoiding problems with texts containing non-ASCII characters"
lang: "en"
---

In many languages, such as Spanish, there are characters that do not have [ASCII](https://en.wikipedia.org/wiki/ASCII) representation, such as **á**, which does have representation in [Unicode](https://en.wikipedia.org/wiki/Unicode).

To avoid problems or for simplification, an equivalence has been established between [Unicode](https://en.wikipedia.org/wiki/Unicode) and [ASCII](https://en.wikipedia.org/wiki/ASCII) characters. Below I'll show you a piece of [Python](https://www.python.org) code that performs this conversion.

```python
# -*- coding: utf-8 -*-
from unicodedata import normalize

def normalize_text(text):
    return normalize('NFKD', text)  # (1)
        .encode('ASCII', 'ignore')  # (2)
```

1. We specify the normal form that we apply in the normalization. In this case `NFKD`. More information about [normal form types](https://en.wikipedia.org/wiki/Unicode_equivalence#Normal_forms).
2. We convert the normalization result to ASCII. In case a character is erroneous, it will simply be ignored.

## Running the function

```python
>>> normalize_text('aáaá eéeé iíií oóoó ñnñn AÀAÀ')
b'aaaa eeee iiii oooo nnnn AAAA'
```
