import { createCipheriv, createDecipheriv, scryptSync, getCiphers } from 'node:crypto';

const algorithm = 'aes-192-cbc'; //getCiphers();
const password = 'Password used to generate key';
const fill: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-/'
const getEnCode = (str: string, password: string, salt: string, algorithm: 'aes-192-cbc') => {
  try {
    const key = scryptSync(password, salt, 24);
    const iv = Buffer.alloc(16, fill, 'base64');

    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  } catch {
    return '';
  }
};

const getDeCode = (encrypted: string, password: string, salt: string, algorithm: 'aes-192-cbc') => {
  try {
    const key = scryptSync(password, salt, 24);
    const iv = Buffer.alloc(16, fill, 'base64');

    const decipher = createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch {
    return null;
  }
};

const tt = () => {
  const text = 'some text';

  const startTimeGetEnCode = performance.now();
  const t = getEnCode(text, password, 'salt', algorithm);
  const tTime = performance.now() - startTimeGetEnCode;

  const startTimeGetDeCode = performance.now();
  const tt = getDeCode(t, password, 'salt', algorithm);
  const ttTime = performance.now() - startTimeGetDeCode;

  console.table([
    { value: text, func: 'text' },
    { value: t, func: 'getEnCode', time: tTime },
    { value: tt, func: 'getDeCode', time: ttTime },
  ]);
};
tt();
