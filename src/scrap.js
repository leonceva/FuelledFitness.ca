const crypto = require('crypto');

console.log(`Creating encrypted password:`);


const password = 'Melito23!';
console.log(`Password entered by user: ${password}`);


// Generate a random salt for the user
const randomSalt = crypto.randomBytes(32).toString('hex');
console.log(`Random Salt for user: ${randomSalt}`);

// Stored salt for testing
const storedSalt = "6475b0b4c1252aca55c4a7a221468d5c79537dc7e535ad30d6e7c81eb2b94557";
console.log(`Stored Salt for user: ${storedSalt}`);

// Apply another hash using a random salt for each user
const saltPassword = crypto.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha512').toString('hex');
console.log(`Salted Password: ${saltPassword}\n`);