import {
  generateKeyPairSync,
  createSign,
  createVerify,
  ECKeyPairKeyObjectOptions,
  SignPrivateKeyInput,
  BinaryLike,
  VerifyPublicKeyInput,
} from 'node:crypto';
import internal from 'node:stream';

const opt: ECKeyPairKeyObjectOptions = {
  namedCurve: 'sect239k1',
};

// `'rsa'`, `'rsa-pss'`, `'dsa'`, `'ec'`, `'ed25519'`, `'ed448'`, `'x25519'`, `'x448'`, or `'dh'`
type KeyPairSyncHash = 'rsa' | 'rsa-pss' | 'dsa' | 'ec' | 'ed25519' | 'ed448' | 'x25519' | 'x448' | 'dh';
const typeHashEC: KeyPairSyncHash = 'ec';

const { privateKey, publicKey } = generateKeyPairSync(typeHashEC, opt);

const sign = createSign('SHA256');
sign.write('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');

const verify = createVerify('SHA256');
verify.write('some data to sign');
verify.end();
const check = verify.verify(publicKey, signature, 'hex');

console.table([
  { value: privateKey, func: 'privateKey', from: 'generateKeyPairSync' },
  { value: publicKey, func: 'publicKey', from: 'generateKeyPairSync' },
  { value: sign, func: 'createSign', from: '' },
  { value: signature, func: 'sign.sign()', from: 'signature' },
  { value: verify, func: 'createVerify', from: 'verify' },
  { value: check, func: 'verify.verify()', from: 'check' },
]);
// ---------------

try {
  const typeHashRSA: KeyPairSyncHash = 'rsa';
  const SALT = 'my_salt_text';
  const passwordText = 'asdasdsdf asdgasd gasd gasd gasd gasdg asdg asdg';

  const startTimeDeCode = performance.now();
  const { privateKey: RsaKeyPrivateKey, publicKey: RsaKeyPublicKey } = generateKeyPairSync(typeHashRSA, {

    modulusLength: 512,
  });
  const timeTextDecode = performance.now() - startTimeDeCode;

  const startTimeDeCode5 = performance.now();
  RsaKeyPublicKey.export({
    type: 'spki',
    format: 'pem',
  });
  const timeTextDecode5 = performance.now() - startTimeDeCode5;

  const startTimeDeCode6 = performance.now();

  RsaKeyPrivateKey.export({
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: SALT,
  });
  const timeTextDecode6 = performance.now() - startTimeDeCode6;

  const startTimeDeCode1 = performance.now();
  const sign_RSA = createSign('SHA256');
  sign_RSA.update(passwordText);
  sign_RSA.end();
  const timeTextDecode1 = performance.now() - startTimeDeCode1;

  const startTimeDeCode2 = performance.now();
  const signatureRSA = sign_RSA.sign(RsaKeyPrivateKey, 'hex');
  const timeTextDecode2 = performance.now() - startTimeDeCode2;

  const startTimeDeCode3 = performance.now();
  const verifyRSA = createVerify('SHA256');
  verifyRSA.update(passwordText);
  verifyRSA.end();
  const timeTextDecode3 = performance.now() - startTimeDeCode3;

  const startTimeDeCode4 = performance.now();
  const t = verifyRSA.verify(RsaKeyPublicKey, signatureRSA, 'hex');
  const timeTextDecode4 = performance.now() - startTimeDeCode4;

  console.table([
    { value: 'generate key', time: timeTextDecode },
    { value: RsaKeyPrivateKey, time: timeTextDecode5 },
    { value: RsaKeyPublicKey, time: timeTextDecode6 },
    { value: sign_RSA, time: timeTextDecode1 },
    { value: signatureRSA.length, time: timeTextDecode2 },
    { value: verifyRSA, time: timeTextDecode3 },
    { value: t, time: timeTextDecode4 },
  ]);
} catch (error) {
  console.dir(error.message);
}
/////////////___________________________________

const typetest: KeyPairSyncHash = 'rsa-pss';

// 1
const test1 = generateKeyPairSync(typetest, {
  modulusLength: 512,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem', cipher: 'aes-256-cbc', passphrase: 'top secret' },
});

const sign_test1 = createSign('SHA256');
sign_test1.update('passwordText');
sign_test1.end();
const key3: SignPrivateKeyInput = {
  key: test1.privateKey,
  format: 'pem',
  type: 'pkcs8',
  passphrase: 'top secret',
};
const signature_test1 = sign_test1.sign(key3, 'hex');
const verify_for_test = createVerify('SHA256');
verify_for_test.update('passwordText');
verify_for_test.end();
const verify_test1 = verify_for_test.verify(test1.publicKey, signature_test1, 'hex');
// 2
const secret_2_test = 'passwordText';
const text_2_test = 'passwordText';

const test2 = generateKeyPairSync(typetest, { modulusLength: 512 });
const t1 = test2.privateKey.export({ type: 'pkcs8', format: 'pem', cipher: 'aes-256-cbc', passphrase: secret_2_test });
const t2 = test2.publicKey.export({ type: 'spki', format: 'pem' });
const sign_test2 = createSign('SHA256');
sign_test2.update(text_2_test);
sign_test2.end();
const signature_test2 = sign_test2.sign(test2.privateKey, 'hex');
const verify_for_test_2 = createVerify('SHA256');
verify_for_test_2.update(text_2_test);
verify_for_test_2.end();
const verify_test2 = verify_for_test_2.verify(test2.publicKey, signature_test2, 'hex');
//3

interface RSAKeyForSignature {
  privateKey: string;
  secret: string;
}

const KeyForSignature = ({ privateKey, secret }: RSAKeyForSignature): SignPrivateKeyInput => {
  return {
    key: privateKey,
    format: 'pem',
    type: 'pkcs8',
    passphrase: secret,
  };
};

interface IRSASignatureData {
  privateKey: SignPrivateKeyInput;
  data: BinaryLike;
}

const RSASignature = ({ privateKey, data }: IRSASignatureData, options?: internal.WritableOptions): string | null => {
  try {
    const sign = createSign('SHA256', options);
    sign.update(data);
    sign.end();
    return sign.sign(privateKey, 'hex');
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
interface IRSAVerify {
  publicKey: VerifyPublicKeyInput;
  signature: string;
  data: BinaryLike;
}

const RSAVerify = ({ publicKey, signature, data }: IRSAVerify, options?: internal.WritableOptions): boolean => {
  try {
    const verify = createVerify('SHA256', options);
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature, 'hex');
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

//
console.table([
  { save: 0, description: 'can but no need' },
  { save: true, description: 'can' },
  { save: false, description: 'cannot' },
  'table',
]);
console.table([
  { save: true, value: typetest, func: 'generateKeyPairSync', name: 'type encode' },
  { value: 'Variable one' },
  { save: true, value: test1.privateKey.length, func: 'test1.privateKey', name: 'generateKeyPairSync' },
  { save: true, value: test1.publicKey.length, func: 'test1.publicKey', name: 'generateKeyPairSync' },
  { save: false, value: sign_test1, func: 'createSign(SHA256)', name: 'sign_test1' },
  { save: true, value: key3, func: 'key3', name: 'key3' },
  { save: true, value: signature_test1, func: 'sign_test1.sign(key3, "hex")', name: 'signature_test1' },
  { save: false, value: verify_for_test, func: 'createVerify(SHA256)', name: 'verify_for_test' },
  { save: 0, value: verify_test1, func: 'verify_for_test.verify()', name: 'verify_for_test.verify' },
  { value: 'Variable two' },
  { save: false, value: test2.privateKey, func: 'test2.privateKey', name: 'generateKeyPairSync' },
  { save: true, value: t1.length, func: 'test2.privateKey.export({})', name: 'privateKey' },
  { save: true, value: t2.length, func: 'test2.publicKey.export({})', name: 'publicKey' },
  { save: false, value: sign_test2, func: 'createSign(SHA256)', name: 'sign_test2' },
  { save: true, value: signature_test2, func: 'sign_test2.sign()', name: 'signature_test2' },
  { save: false, value: verify_for_test_2, func: 'createVerify(SHA256)', name: 'verify_for_test_2' },
  { save: 0, value: verify_test2, func: 'verify_for_test_2.verify()', name: 'verify_test2' },
]);

try {
} catch (error) {}
