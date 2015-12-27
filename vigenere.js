// create our object
var vigenere = {};

// create our properties
vigenere.plaintext = "";
vigenere.ciphertext = "";
vigenere.keyword = "";

// now let's create our Vigenere table
vigenere.alphabets = [];
vigenere.alphabets[0] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (x = 1; x < vigenere.alphabets[0].length; x++) {
    vigenere.alphabets[x] = vigenere.alphabets[0].substr(x);
    vigenere.alphabets[x] = vigenere.alphabets[x].concat(vigenere.alphabets[0].substring(0,x));
}

vigenere.encrypt = function encrypt(plaintext, password) {

	// initialize defaults
	this.keyword = password.toUpperCase();
	this.plaintext = plaintext.toUpperCase();
	this.ciphertext = "";

	// we'll need to keep track of which letter of the password we're currently using
	var pwIndex = 0;

	// time to traverse the plaintext message
     for (var x = 0; x < this.plaintext.length; x++) {

		// first figure out which row of the Vigenere table we must use
		vRow = this.alphabets[0].indexOf(this.keyword[pwIndex]);
		thisLetter = this.alphabets[0].indexOf(this.plaintext[x]);

		// if the next char of plaintext is NOT a capital letter
		if (thisLetter === -1) {
			// then just pass it through unchanged
			this.ciphertext += this.plaintext[x];
		} else {
			// otherwise find its counterpart in the V. table
			thisRow = this.alphabets[vRow];
			this.ciphertext += thisRow[thisLetter];
		}

		// don't forget to move to next letter in our password
		pwIndex++;

		// if we "run out of password", start back at 1st letter again
		if (pwIndex >= this.keyword.length) {
			pwIndex = 0; 
		}
	}

	// now we're ready to share the encrypted result
	return this.ciphertext;
}

vigenere.decrypt = function decrypt(ciphertext, password) {

	// initialize defaults
	this.keyword = password.toUpperCase();
	this.plaintext = "";
	this.ciphertext = ciphertext;

	// we'll need to keep track of which letter of the password we're currently using
	var pwIndex = 0;

	// let's traverse the ciphertext message
     for (var x = 0; x < this.ciphertext.length; x++) {

		// figure out which row of the Vigenere table should have been used with this password
		vRow = this.alphabets[0].indexOf(this.keyword[pwIndex]);
		thisLetter = this.alphabets[vRow].indexOf(this.ciphertext[x]);

		// if the next char of ciphertext is NOT a capital letter
		if (thisLetter === -1) {
			// then just pass it through unchanged
			this.plaintext += this.ciphertext[x];
		} else {
			// otherwise find its counterpart "backwards" in the V. table
			thisRow = this.alphabets[0]; // this will always be the first row
			this.plaintext += thisRow[thisLetter];
		}

		// don't forget to move to next letter in our password
		pwIndex++;

		// if we "run out of password", start back at 1st letter again
		if (pwIndex >= this.keyword.length) {
			pwIndex = 0; 
		}
	}

	// now we're ready to share the decrypted result 
	return this.plaintext;
}
