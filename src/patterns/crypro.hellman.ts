import * as crypto from 'crypto';

const alice = crypto.getDiffieHellman('modp14');
const bob = crypto.getDiffieHellman('modp14');
console.log('\x1b[33m%s\x1b[0m', '-alice-->', alice);
console.log('\x1b[33m%s\x1b[0m', '-bob-->', bob);
alice.generateKeys();
bob.generateKeys();

console.log('\x1b[33m%s\x1b[0m', '-alice-->', alice.getPublicKey());
console.log('\x1b[33m%s\x1b[0m', '-bob-->', bob.getPublicKey());
console.log('\x1b[33m%s\x1b[0m', '-alice-p->', alice.getPrivateKey());
console.log('\x1b[33m%s\x1b[0m', '-bob-p->', bob.getPrivateKey());
//@ts-ignore
const aliceSecret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
//@ts-ignore
const bobSecret = bob.computeSecret(alice.getPublicKey(), null, 'hex');

//@ts-ignore
const aliceSecret1 = alice.computeSecret(bob.getPrivateKey(), null, 'hex');
//@ts-ignore
const bobSecret1 = bob.computeSecret(alice.getPrivateKey(), null, 'hex');

console.log('\x1b[33m%s\x1b[0m', '-aliceSecret-->', aliceSecret);
console.log('\x1b[33m%s\x1b[0m', '-bobSecret-->', bobSecret);
console.log('\x1b[35m%s\x1b[0m', bobSecret === aliceSecret);
console.log('\x1b[35m%s\x1b[0m', bobSecret1 === aliceSecret1);
