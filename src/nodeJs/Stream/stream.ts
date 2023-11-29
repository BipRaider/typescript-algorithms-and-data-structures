import Stream from 'stream';
import fs from 'fs';
import path from 'path';
import fsP from 'fs/promises';

console.dir('----------------------stream------start--------------');
const text = path.resolve(__dirname, 'test.text');
const text1 = path.resolve(__dirname, 'test1.text');

interface option {
  flags?: string | undefined;
  encoding?: BufferEncoding | undefined;
  fd?: number | fsP.FileHandle | undefined;
  mode?: number | undefined;
  autoClose?: boolean | undefined;
  emitClose?: boolean | undefined;
  start?: number | undefined;
  highWaterMark?: number | undefined;
}

const option: option = {
  //  encoding: 'utf-8', // 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'base64url' | 'latin1' | 'binary' | 'hex';
  //   start: 9022,
  //   end: 9911,
};
// const t = async () => {
//
//   const t = await fsP.open(text, 'r+');
//   console.dir(t.truncate(7));
// };

// t();
console.dir('----------------------stream------createReadStream------start--------');
const streamRead = fs.createReadStream(text, option);
streamRead.read;
streamRead.push;
streamRead.close;
streamRead.pause;

//64 kb  or 65486 bytes
streamRead.on('resume', (chunk: any) => {
  console.log('1 resume ->', chunk);
});

streamRead.on('open', chunk => {
  console.log('2 open ->', chunk);
});

streamRead.on('ready', (chunk: any) => {
  console.log('3 ready ->', chunk);
});
//
// streamRead.on('readable', (chunk: any) => {
//   console.log('4 readable ->', chunk);
// });

// streamRead.on('data', chunk => {
//   console.log('5 data  start ->', chunk);
// });

streamRead.on('end', (chunk: any) => {
  console.log('6 start  ->', chunk);
});

streamRead.on('error', e => {
  console.log('7 error ->', e);
});

streamRead.on('close', (chunk: any) => {
  console.log('8 close ->', chunk);
});

streamRead.on('pause', (chunk: any) => {
  console.log('9 pause ->', chunk);
});

console.dir(text);
console.dir('----------------------stream------createReadStream------end--------');
console.dir('----------------------stream------createReadStream------start--------');
const streamWrite = fs.createWriteStream(text1, option);
streamWrite.write;
streamWrite.end;
streamWrite.close;
streamWrite.destroy;
streamWrite.on;
const SWrite = async () => {
  for (let i = 0; i < 20; i++) {
    streamWrite.write(i + '\n');
  }
  streamWrite.end();
};

SWrite();

console.dir('----------------------stream------createReadStream------end--------');
console.dir('----------------------stream------end--------------');
