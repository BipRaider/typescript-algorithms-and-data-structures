import crypto from 'node:crypto';

const secret = 'abcdefg';
const hash: string = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');
const hash1: string = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('base64');
const hash2: string = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('base64url');
const hash3: string = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('binary');
const hash4: string = crypto.createHmac('sha256', secret).digest('hex');
const hash5: string = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');

console.table(
  [
    { createHmac: hash },
    { createHmac: hash1 },
    { createHmac: hash2 },
    { createHmac: hash3 },
    { createHmac: hash4 },
    { createHmac: hash5 },
  ],
  ['createHmac'],
);
