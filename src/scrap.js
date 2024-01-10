const crypto = require('crypto');

console.log(`Creating encrypted password:`);


const password = 'test';
console.log(`Password entered by user: ${password}`);


// Generate a random salt for the user
const randomSalt = crypto.randomBytes(32).toString('hex');
console.log(`Random Salt for user: ${randomSalt}`);

// Stored salt for testing
// const storedSalt = "6475b0b4c1252aca55c4a7a221468d5c79537dc7e535ad30d6e7c81eb2b94557";
// console.log(`Stored Salt for user: ${storedSalt}`);

// Apply another hash using a random salt for each user
const saltPassword = crypto.pbkdf2Sync(password, randomSalt, 10000, 64, 'sha512').toString('hex');
console.log(`Salted Password: ${saltPassword}\n`);


/* INSERT INTO users VALUES(
    nextval('users_user_id_seq'),
    'test@fuelledfitness.ca',
    'John',
    'Doe',
    'dc74732954f5342323d1ddb0528eaa32c00511f81629601bdd1fe6b43f7192db8158d7213972fd1bdb15169e9042f779c4a16eb6f12fc599cabad383a8c539a7',
    'd0ad38ff9302431550faf2c6f000e10a5ba5fc5fbc37cfa8637d4635b127e9c4',
    'active'
); */