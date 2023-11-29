import { Dir } from 'node:fs';
import { opendir, readdir, readFile, watch, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const fileUrl = join(__dirname);

const openFn = async () => {
  const filesNama = [];
  const dir: Dir = await opendir(fileUrl);

  for await (const dirent of dir) {
    console.log('dirent=>', dirent);
    filesNama.push(dirent.name);
  }
  return filesNama;
};
openFn();

const readdirFn = async () => {
  try {
    const files = await readdir(fileUrl);
    for (const file of files) console.log('readdir=>', file);
  } catch (err) {
    console.error(err);
  }
};
readdirFn();

const readFileFn = async () => {
  try {
    const controller = new AbortController();
    const { signal } = controller;
    const files = await readFile(join(fileUrl, 'thefile.txt'), { signal });
    console.log('readFile=>', String.fromCharCode(...files));
  } catch (err) {
    console.error(err);
  }
};
readFileFn();

const watchFn = async () => {
  const controller = new AbortController();
  const { signal } = controller;
  setTimeout(() => {
    controller.abort();

    console.dir('watch abort');
  }, 10000);
  try {
    console.dir('watch  =>');
    const watcher = watch(join(__dirname, 'thefile.txt'), {
      signal,
    });

    for await (const event of watcher) console.log('watch_event ->', event);
  } catch (err) {
    if (err.name === 'AbortError') return;
    console.dir(err.massage);
  }
};
watchFn();

const writeFileFn = async () => {
  const controller = new AbortController();
  const { signal } = controller;

  try {
    const data = new Uint8Array(Buffer.from('Hello Node.js'));
    const promise = await writeFile(join(__dirname, 'thefile.txt'), data, { signal });

    controller.abort();

    console.log('promise =>', promise);
  } catch (err) {
    console.error(err);
  }
};

writeFileFn();
