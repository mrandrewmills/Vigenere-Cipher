/**
 *  vigenere.js - JavaScript Object for Vigenere ciphers
 *  @type {object}
 *  @namespace
 */
var vigenere = {

      /**
       * plaintext - the real, original message
       * @type {String}
       */
        plaintext: "",

      /**
       * ciphertext - the encrypted version of the message
       * @type {String}
       */
        ciphertext: "",

      /**
       * keyword - the password used to encrypt and decrypt the ciphertext
       * @type {String}
       */
        keyword: "",

      /**
       * alphabets - a slightly modified version of the Vigenere table,
       * @type {Array}
       */
        alphabets: [],

        /**
         *
         */
        init: function init() {

            "use strict";

            var x;

            // populate the first row of our Vigenere table
            this.alphabets[0] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            // populate the rest of our Vigenere table
            for (x = 1; x < this.alphabets[0].length; x = x + 1) {
                this.alphabets[x] = this.alphabets[0].substr(x);
                this.alphabets[x] = this.alphabets[x].concat(this.alphabets[0].substring(0, x));
            }
        },

        /**
         *
         */
        encrypt : function encrypt(plaintext, password) {

            "use strict";

            var x, pwIndex, vRow, thisLetter, thisRow;

            // initialize defaults
            this.keyword = password.toUpperCase();
            this.plaintext = plaintext.toUpperCase();
            this.ciphertext = "";

            // we'll need to keep track of which letter of the password we're currently using
            pwIndex = 0;

            // time to traverse the plaintext message
            for (x = 0; x < this.plaintext.length; x = x + 1) {
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
                pwIndex = pwIndex + 1;

                // if we "run out of password", start back at 1st letter again
                if (pwIndex >= this.keyword.length) {
                    pwIndex = 0;
                }
            }

            // now we're ready to share the encrypted result
            return this.ciphertext;
        },

        /**
         *
         */
        decrypt : function decrypt(ciphertext, password) {

            "use strict";

            // initialize defaults
            this.keyword = password.toUpperCase();
            this.plaintext = "";
            this.ciphertext = ciphertext;

            // we'll need to keep track of which letter of the password we're currently using
            var pwIndex, x, vRow, thisLetter, thisRow;

            // we'll need to keep track of which letter of the password we're currently using
            pwIndex = 0;

            // let's traverse the ciphertext message
            for (x = 0; x < this.ciphertext.length; x = x + 1) {

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
                pwIndex = pwIndex + 1;

                // if we "run out of password", start back at 1st letter again
                if (pwIndex >= this.keyword.length) {
                    pwIndex = 0;
                }
            }

            // now we're ready to share the decrypted result
            return this.plaintext;
        }

    };

// to build out our Vigenere table
vigenere.init();
