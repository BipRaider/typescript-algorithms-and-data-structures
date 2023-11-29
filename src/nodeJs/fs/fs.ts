import path from 'path';
import fs from 'fs';
import fsP from 'fs/promises';
import Emitter from 'events';

const emitter = new Emitter();

console.dir('----------------FILES---------------------------');

//Синхронные
fs.mkdirSync; //создать папку
fs.rmdirSync; //удалить папку
fs.rmSync; //удалить папку
fs.writeFileSync; // запись в файл
fs.appendFileSync; // для добавленная данных в файл
fs.readFileSync; // чтение файла
fs.opendirSync; // открыть папку

//Асинхронные на callback
fs.mkdir; //создать папку
fs.rmdir; //удалить папку
fs.rm; // удаляет фал
fs.writeFile; // запись в файл
fs.appendFile; // для добавленная данных в файл
fs.readFile; // чтение файла
fs.open; // открыть фал
fs.opendir; // открыть папку

//Асинхронные + Promise
fsP.mkdir; //создать папку
fsP.rmdir; //удалить папку
fsP.rm; // удаляет файл
fsP.writeFile; // запись в файл
fsP.appendFile; // для добавленная данных в файл
fsP.readFile; // чтение файла
fsP.open; // открыть папку
fsP.opendir; // открыть папку
fsP.copyFile; // скопировать файл
fsP.chmod; // изменить фод файлов
fsP.chown; // изменить владельца файла
fsP.cp; // скопировать папку
fsP.link; // создает ссылку
fsP.unlink; // удаляет ссылку.Если путь указывает на путь к файлу, который не является символической ссылкой, файл удаляется.
fsP.utimes; //Измените временные метки файловой системы объекта, на который ссылается путь.

//----------------------------------------
const recursive = path.resolve(__dirname, 'recursive', 'recursive', 'recursive');
const recursive1 = path.resolve(__dirname, '../src/recursive/recursive/recursive');
console.log('--1-->', recursive);
console.log('--2-->', recursive1);
//--------------------------------------------------------

//Блокирует поток( Синхронные )
// try {
//   fs.mkdirSync(recursive, option);
//   fs.mkdirSync(sync, option);

//   console.dir('Папка создана');
// } catch (error) {
//   console.dir('Папка есть');
// }
//--------
//Не блокирует (Асинхронные)
//TODO: Need make func for checks if exists folder and files

const checkIfExist = async (path: string) => {
  try {
    const t = await fsP.stat(path);
    return true;
  } catch {
    return false;
  }
};

export const rmdir = async (path: string) => {
  console.dir('<- rmdir');

  if (!(await checkIfExist(path))) return 'fils not found  ';
  return new Promise((resolve, reject) => {
    fs.rmdir(path, err => {
      if (err) {
        console.dir(err);
        return reject(err);
      }

      resolve('Папка удалена ->');
    });
  });
};

export const mkdir = async (path: string) => {
  console.dir('<- mkdir');
  if (await checkIfExist(path)) return 'fils found and do not need make again';
  return new Promise(async (resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        console.dir(err);
        return reject(err);
      }

      resolve('Папка создана mkdir ->');
    });
  });
};

export const readFile = async (path: string) => {
  console.dir('<- readFile');
  const option = {
    //encoding: 'utf-8',
    // flag: undefined,
    // signal: undefined,
  };
  if (!(await checkIfExist(path))) return 'fils not found  and Cannot read file';
  return new Promise((resolve, reject) => {
    fs.readFile(
      path,
      {
        encoding: 'utf-8',
      },
      (err, data) => {
        if (err) {
          console.dir(err);
          return reject(err);
        }

        resolve(data);
      },
    );
  });
};

export const removeFile = async (path: string) => {
  console.dir('<- readFile');
  const option = {
    //encoding: 'utf-8',
    // flag: undefined,
    // signal: undefined,
  };
  if (!(await checkIfExist(path))) return 'fils not found  and Cannot remove file';
  return new Promise((resolve, reject) => {
    fs.rm(path, err => {
      if (err) {
        console.dir(err);
        return reject(err);
      }
      resolve('file remove');
    });
  });
};
export const writeFile = async (path: string, data: string) => {
  console.dir('<- writeFile');
  if (!(await checkIfExist(path))) return 'fils not found  and Cannot write to file';
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        console.dir(err);
        return reject(err);
      }

      resolve('Файл создана test.ts ->');
    });
  });
};

export const appendFile = async (path: string, data: string) => {
  console.dir('<- appendFile');
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, err => {
      if (err) {
        console.dir(err);
        return reject(err);
      }

      resolve('Файл добавлено test.ts ->');
    });
  });
};
///--
const sync = path.resolve(__dirname, 'sync');
const nosync = path.resolve(__dirname, 'nosync');
const file = path.resolve(sync, 'test.ts');
const option = {
  recursive: true,
};

const ms = 'message';
const msOnce = 'message-once';

const Acinhron = async () => {
  console.log('Acinhron ->');
  const t = await mkdir(nosync);
  emitter.emit(msOnce, t);
  emitter.emit(msOnce, t);
  console.dir(t);
  const t1 = await writeFile(file, 'const WriteFile = "create";');
  emitter.emit(ms, t1);
  console.dir(t1);
  const t2 = await appendFile(file, 'const AppendFile = "added the data to file";');
  emitter.emit(ms, t2);
  console.dir(t2);
  const t4 = await readFile(file);
  emitter.emit(ms, t4);
  console.dir(t4);
  const t5 = await removeFile(file);
  emitter.emit(ms, t5);
  console.dir(t5);
  const t3 = await rmdir(nosync);
  console.log('<-Acinhron');
};

try {
  console.dir('START');

  Acinhron();

  console.log('---END---');
} catch (error) {
  console.dir(error);
}
//test 2

const isExist = async (path: string) => {
  try {
    const t = await fsP.stat(path);
    return true;
  } catch {
    return false;
  }
};

const sync1 = path.resolve(__dirname, 'sync1');
const filePath = path.resolve(sync1, 'test_json.json');
const saveValue = async (key: string, value: string) => {
  try {
    let data: any = {};

    if (await isExist(filePath)) {
      const file: string = (await fsP.readFile(filePath)).toString();
      data = JSON.parse(file);
    }

    data[key] = value;
    console.dir(data);
    fsP.writeFile(filePath, JSON.stringify(data));
  } catch (error) {
    if (error instanceof Error) console.dir(error.message);
  }
};

const getKeyValue = async (key: string) => {
  if (!(await isExist(filePath))) return undefined;

  const file: string = (await fsP.readFile(filePath)).toString();
  const data = JSON.parse(file);
  return data[key];
};

saveValue('key', 'value');
saveValue('key1', 'value1');

const t = async () => {
  const t = await getKeyValue('key');
  const t1 = await getKeyValue('key1');
  console.log('--->', { t, t1 });
};
t();
