import fs from 'node:fs';
import path from 'node:path';

// https://github.com/dwmkerr/architecture-as-code/tree/master/aac-cli/src/utils

/*** Unlinks a file or folder.
 * Resolves with true if a deletion occurred,
 * false if no deletion occurred,
 * and rejects if there is an exception.
 * ```ts
 * const filePath = './temp.test';
 * ```
 */
export const deleteIfExists = async (path: string): Promise<boolean | NodeJS.ErrnoException> => {
  return await new Promise<boolean | NodeJS.ErrnoException>((resolve, reject): void => {
    fs.unlink(path, (err: NodeJS.ErrnoException | null): void => {
      if (err === null) return resolve(true);
      if (err && err.code === 'ENOENT') return resolve(false);
      return reject(err);
    });
  });
};
/*** Links a file or folder.
 * Resolves with true if exists,
 * false if no exists,
 * and rejects if there is an exception.
 * ```ts
 * const filePath = './temp.test';
 * ```
 */
export const fileExists = async (path: string): Promise<boolean | NodeJS.ErrnoException> => {
  return await new Promise<boolean | NodeJS.ErrnoException>((resolve, reject): void => {
    fs.stat(path, (err: NodeJS.ErrnoException): void => {
      if (err === null) return resolve(true);
      if (err && err.code === 'ENOENT') return resolve(false);
      return reject(err);
    });
  });
};

export type TFineDone = (err: NodeJS.ErrnoException | null, files?: string[]) => any;
export type TPredicate = (file: string, stat: fs.Stats) => any;

const walk = (dir: string, existingResults: string[], predicate: TPredicate, done: TFineDone): void => {
  const results: string[] = existingResults;

  fs.readdir(dir, (err: NodeJS.ErrnoException, listFiles: string[]): void => {
    if (err) return done(err);

    let pending = listFiles.length;

    if (pending === 0) return done(null, results);

    return listFiles.forEach(file => {
      const filePath: string = path.resolve(dir, file);

      fs.stat(filePath, (_statErr: NodeJS.ErrnoException, stat: fs.Stats): void => {
        if (predicate(filePath, stat)) results.push(filePath);

        if (stat && stat.isDirectory()) {
          walk(filePath, results, predicate, (): void => {
            pending -= 1;

            if (!pending) done(null, results);
          });
        } else {
          pending -= 1;

          if (!pending) done(null, results);
        }
      });
    });
  });
};

/***
 * Looking for a file or a folder.
 * ```ts
 * find(path.normalize('./src'), (file, stat) => {
      return file.match(/find.js$/) && !stat.isDirectory();
    }
 * ```
 *
 */
export const find = async (dir: string, predicate: TPredicate): Promise<NodeJS.ErrnoException | string[]> => {
  const normalizedPath: string = path.normalize(dir);

  return await new Promise((resolve, reject): void => {
    walk(normalizedPath, [], predicate, (err: NodeJS.ErrnoException | null, files: string[]): void => {
      if (err) return reject(err);
      return resolve(files.map(file => path.relative('', file)));
    });
  });
};
