import {
  privateDecrypt,
  RsaPrivateKey,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  randomBytes,
  generateKeyPairSync,
} from 'node:crypto';

const random_bytes_tume = performance.now();
const random_bytes = randomBytes(16);
const random_bytes_tume_end = performance.now() - random_bytes_tume;

console.table(
  [
    {
      length: random_bytes.length,
      value: random_bytes,
      func: 'randomBytes()',
      hex: random_bytes.toString('hex'),
      time: random_bytes_tume_end,
    },
  ],
  ['func', 'value', 'length', 'hex', 'time'],
);

//
const secret = 'secret';
const keyPair_tume = performance.now();
const keyPair = generateKeyPairSync('rsa', {
  modulusLength: 512,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: secret,
  },
});
const keyPair_tume_end = performance.now() - keyPair_tume;
//
type TT = Omit<BufferEncoding, 'hex' | 'base64' | 'base64url'>;
/** 'binary' | 'utf8' | 'ucs-2' | 'latin1' | 'ascii' | 'utf-8' | 'utf16le' | 'ucs2'  */
const encoding = 'binary';

const privKey: RsaPrivateKey = {
  key: keyPair.privateKey,
  passphrase: secret,
};
const data_tume = performance.now();
const data: NodeJS.ArrayBufferView = Buffer.from('hello world', encoding);
const data_tume_end = performance.now() - data_tume;

const private_encrypt_tume = performance.now();
const private_encrypt = privateEncrypt(privKey, data);
const private_encrypt_tume_end = performance.now() - private_encrypt_tume;

const t = new Uint8Array(private_encrypt.length);
t.set([...private_encrypt], 0);

const public_decrypt_tume = performance.now();
const public_decrypt = publicDecrypt(keyPair.publicKey, t);
const public_decrypt_tume_end = performance.now() - public_decrypt_tume;

const public_encrypt_tume = performance.now();
const public_encrypt = publicEncrypt(keyPair.publicKey, data);
const public_encrypt_tume_end = performance.now() - public_encrypt_tume;

const private_decrypt_tume = performance.now();
const private_decrypt = privateDecrypt(privKey, public_encrypt);
const private_decrypt_tume_end = performance.now() - private_decrypt_tume;

console.table(
  [
    { value: 'keyPair', func: 'generateKeyPairSync', time: keyPair_tume_end },
    { value: 'data', func: 'Buffer', time: data_tume_end, encoding },
    { value: private_encrypt.toString(encoding), func: 'privateEncrypt', time: private_encrypt_tume_end, encoding },
    { value: public_decrypt.toString(encoding), func: 'publicDecrypt', time: public_decrypt_tume_end, encoding },
    { value: public_encrypt.toString(encoding), func: 'publicEncrypt', time: public_encrypt_tume_end, encoding },
    { value: private_decrypt.toString(encoding), func: 'privateDecrypt', time: private_decrypt_tume_end, encoding },
  ],
  ['encoding', 'value', 'func', 'time'],
);
// ------------------------------------------
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUp
wmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ5
1s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQABAoGAFijko56+qGyN8M0RVyaRAXz++xTqHBLh
3tx4VgMtrQ+WEgCjhoTwo23KMBAuJGSYnRmoBZM3lMfTKevIkAidPExvYCdm5dYq3XToLkkLv5L2
pIIVOFMDG+KESnAFV7l2c+cnzRMW0+b6f8mR1CJzZuxVLL6Q02fvLi55/mbSYxECQQDeAw6fiIQX
GukBI4eMZZt4nscy2o12KyYner3VpoeE+Np2q+Z3pvAMd/aNzQ/W9WaI+NRfcxUJrmfPwIGm63il
AkEAxCL5HQb2bQr4ByorcMWm/hEP2MZzROV73yF41hPsRC9m66KrheO9HPTJuo3/9s5p+sqGxOlF
L0NDt4SkosjgGwJAFklyR1uZ/wPJjj611cdBcztlPdqoxssQGnh85BzCj/u3WqBpE2vjvyyvyI5k
X6zk7S0ljKtt2jny2+00VsBerQJBAJGC1Mg5Oydo5NwD6BiROrPxGo2bpTbu/fhrT8ebHkTz2epl
U9VQQSQzY1oZMVX8i1m5WUTLPz2yLJIBQVdXqhMCQBGoiuSoSjafUhV7i1cEGpb88h5NBYZzWXGZ
37sJ5QsW+sJyoNde3xH8vdXhzU7eT82D6X/scw9RZz+/6rCJ4p0=
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0
FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/
3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB
-----END PUBLIC KEY-----`;

const plaintext = Buffer.from('Hello world!', 'utf8');

// This is what you usually do to transmit encrypted data.
const enc1 = publicEncrypt(publicKey, plaintext);
const dec1 = privateDecrypt(privateKey, enc1);
console.log(dec1.toString('utf8'));

// This works as well.
const enc2 = privateEncrypt(privateKey, plaintext);
const dec2 = publicDecrypt(publicKey, enc2);
console.log(dec2.toString('utf8'));
