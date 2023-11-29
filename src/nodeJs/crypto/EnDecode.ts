export interface EnDeCodeOptions {
  /*** Default `utf8` */
  encoding?: BufferEncoding;
  /*** Add salt to string.*/
  salt?: string;
}

export class EnDeCode {
  private chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-/';
  private lookup: Uint8Array;
  private encoding: BufferEncoding = 'utf8';

  constructor(options: EnDeCodeOptions = {}) {
    if (options.encoding) this.encoding = options.encoding;

    this.init();
  }

  private init = (): void => {
    const lookup:Uint8Array = new Uint8Array(256);

    for (let i = 0; i < this.chars.length; i++) {
      lookup[this.chars.charCodeAt(i)] = i;
    }
    this.lookup = lookup;
  };

  public encode = (str: string): string => {
    const bytes = this.strBuffer(str);
    const len = bytes.length;

    let base64 = '';

    for (let i = 0; i < len; i += 3) {
      base64 += this.chars[bytes[i] >> 2];
      base64 += this.chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += this.chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += this.chars[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + '=';
    else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + '==';

    return base64;
  };

  public decode = (base64: string) => {
    let bufferLength = base64.length * 0.75;
    let len = base64.length;
    let p = 0;

    if (base64[base64.length - 1] === '=') {
      bufferLength--;
      if (base64[base64.length - 2] === '=') bufferLength--;
    }

    let arraybuffer = new ArrayBuffer(bufferLength);
    let bytes = new Uint8Array(arraybuffer);

    for (let i = 0; i < len; i += 4) {
      let encoded1 = this.lookup[base64.charCodeAt(i)];
      let encoded2 = this.lookup[base64.charCodeAt(i + 1)];
      let encoded3 = this.lookup[base64.charCodeAt(i + 2)];
      let encoded4 = this.lookup[base64.charCodeAt(i + 3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return String.fromCharCode(...bytes);
  };

  public strBuffer = (str: string): Buffer => {
    if (typeof str !== 'string') throw Error('Is not string.');
    return Buffer.from(str, this.encoding);
  };
}

const text = 'charsG/dsf/se212334324/@3 25F4573273436ssdf356?-+.,!';

const EDcode = new EnDeCode();

const startTimeEnCode = performance.now();
const textEncode = EDcode.encode(text);
const timeTextEncode = performance.now() - startTimeEnCode;

const startTimeDeCode = performance.now();
const textDecode = EDcode.decode(textEncode);
const timeTextDecode = performance.now() - startTimeDeCode;

console.table(
  [
    { EnDeCode: text, step: 'enter the text', name: 'text' },
    { EnDeCode: textEncode, step: 'encode', name: 'textEncode', time: timeTextEncode },
    { EnDeCode: textDecode, step: 'decode', name: 'textDecode', time: timeTextDecode },
    { EnDeCode: textDecode === text, step: 'compare', name: 'textDecode === text' },
  ],
  ['EnDeCode', 'step', 'name', 'time'],
);
