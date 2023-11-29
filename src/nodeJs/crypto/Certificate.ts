import crypto, { BinaryLike } from 'node:crypto';
import { Buffer } from 'node:buffer';

const certificate = crypto.Certificate;
const spkac: BinaryLike = new Uint16Array(16).toString();

console.table([
  { certificate: certificate.exportChallenge(spkac).toString('utf8'), spkac: spkac },
  { certificate: certificate.exportPublicKey(spkac).toString('utf8'), spkac: spkac },
  { certificate: certificate.verifySpkac(Buffer.from(spkac, 'utf8')), spkac: spkac },
]);
