import { createECDH, ECDH, getCurves } from 'node:crypto';

const alice = createECDH(getCurves()[23]);
const aliceKey = alice.generateKeys();

const bob = createECDH(getCurves()[23]);
const bobKey = bob.generateKeys();

const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

const aliceKeyGetPrivateKey = alice.getPrivateKey('hex');
const aliceKeyGetPublicKey = alice.getPublicKey('hex');

const ecdh = createECDH(getCurves()[23]);
ecdh.generateKeys();

const compressedKey = ecdh.getPublicKey('hex', 'compressed');

const uncompressedKey = ECDH.convertKey(compressedKey, getCurves()[23], 'hex', 'hex', 'uncompressed');
console.dir(uncompressedKey);
console.table(
  [
    { value: alice, name: 'alice', func: 'createECDH', time: '' },
    { value: aliceKey.length, name: 'aliceKey', func: 'generateKeys', time: '' },
    { value: aliceKeyGetPrivateKey, name: 'aliceKeyGetPrivateKey', func: 'getPrivateKey', time: '' },
    { value: aliceKeyGetPublicKey.length, name: 'aliceKeyGetPublicKey', func: 'getPublicKey', time: '' },
    {
      value: aliceKeyGetPublicKey === aliceKey.toString('hex'),
      name: 'aliceKeyGetPublicKey === aliceKey',
      func: 'getPublicKey and generateKeys',
      time: '',
    },
    { value: bob, name: 'bob', func: 'createECDH', time: '' },
    { value: bobKey.length, name: 'bobKey', func: 'generateKeys', time: '' },
    { value: aliceSecret.toString('hex'), name: 'aliceSecret', func: 'computeSecret', time: '' },
    { value: bobSecret.toString('hex'), name: 'bobSecret', func: 'computeSecret', time: '' },
  ],
  ['value', 'name', 'time', 'func'],
);
