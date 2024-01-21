# Replace punctuation symbols in Python

Following I will explain how to replace punctuation symbols by whitespace.

```python
import re, string

def remove_punctuation ( text ):
  return re.sub('[%s]' % re.escape(string.punctuation), ' ', text)
```

**Calling to previous function**

```bash
>>> remove_punctuation ("El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.")
```

**We will get this output**

```bash
'El perro  de San Roque  no tiene rabo  ni nunca lo ha tenido '
```

We could make the function a little bit more generic to replace punctuation symbols by any other string.

```python
import re, string

def replace_punctuation(text, replace):
  return re.sub('[%s]' % re.escape(string.punctuation), replace, text)
```

**Calling the function to replace punctuation symbols by "[stop]"**

```python
>>> replace_punctuation(
  "El perro, de San Roque, no tiene rabo; ni nunca lo ha tenido.",
  '[stop]')

# output
'El perro[stop] de San Roque[stop] no tiene rabo[stop] ni nunca lo ha tenido[stop]'
```
