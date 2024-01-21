# Normalizar texto en Python

En muchos idiomas, como es el caso del español, hay caracteres que no tienen representación {ASCII}, como por ejemplo la **á**, que sí que tiene representación en {Unicode}.

Para evitar problemas o por simplificar, se ha dado una equivalencia entre los caracteres {Unicode} y los {ASCII}. A continuación os pondré un trozo de código en {Python} que hace esta conversión.

```python
# -*- coding: utf-8 -*-
from unicodedata import normalize

def normalize_text ( text ):
  return normalize('NFKD', text) # ①
    .encode('ASCII', 'ignore') # ②
```
1. Especificamos la forma normal que aplicamos en la normalización. En este caso `NFKD`. Más información sobre {normalForms}.
2. Confertimos el resultado de la normalización a {ASCII}. En caso de que un carácter sea erróneo simplemente será ignorado. 

**Ejecutando la función**

```python
>>> normalize_text ( 'aáaá eéeé iíií oóoó ñnñn AÀAÀ' )
b'aaaa eeee iiii oooo nnnn AAAA'
```
