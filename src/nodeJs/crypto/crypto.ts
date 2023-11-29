const crypto = require('crypto');

const pass = 'test';
const salt = 'salt';
const iterations = 1000;
const keylen = 64;
const digest = 'sha512';

const passHash = crypto.pbkdf2Sync(pass, salt, iterations, keylen, digest);

console.log('passHash --> :', passHash.toString('base64'));
