const crypto = require('crypto');

// Step 1: Generate a random key
const randomKey = crypto.randomBytes(32).toString('hex');
console.log('Random Key:', randomKey);

// Step 2: Hash a password using the random key
const password = 'your_password_here';
const salt = 'your_salt_here'; // You should use a unique salt for each user
const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

console.log('Hashed Password:', hash);