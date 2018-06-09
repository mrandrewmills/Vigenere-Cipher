# Vigenere-Cipher
a JavaScript object for working with Vigenere ciphers inspired by reading Simon Singh's "[The Code Book](http://amzn.to/28Sb5gg)" (Amazon aff.)

## Instructions

First, you need to include the Vigenere JS file, obviously.

```
<script src="your/path/to/vigenere.min.js"></script>
```

Then you'll create a new object instance, like so:

```javascript
var objVigenere = new Vigenere();
```

From there, you can leverage the encrypt and decrpyt methods of the object you've created.

```javascript
var myCipher = objVigenere.encrypt("This is my super secret message.", "tqbfjotld");
var myPlaintext = objVigenere.decrypt(myCipher, "tqbfjotld");
```
