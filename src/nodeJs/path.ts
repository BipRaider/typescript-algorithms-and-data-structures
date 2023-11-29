import path from 'path';
const { homedir } = require('os');
const { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } = require('path');
//https://nodejs.org/api/path.html
console.dir('----------------PATH----------------------------');

console.log('', path.join('src', 'index.js'));
console.log('', path.join(__dirname, 'src', 'index.js'));
console.log('', path.join(__dirname, '..', '..'));
console.log('', path.resolve('src', 'index.js'));

const fullPath = path.resolve('src', 'index.js');
console.log(' : ', path.parse(fullPath));
console.log(': ', path.sep);
console.log('', path.isAbsolute(fullPath));
console.log('', path.basename(fullPath));
console.log('', path.extname(fullPath));
console.log('', path.dirname(fullPath));
console.log(
  '',
  path.format({
    root: `/ignored`,
    dir: `${path.sep}home${path.sep}user${path.sep}dir`,
    base: 'file.txt',
  }),
);

console.log('', path.normalize('C:\\///temp\\\\foo\\bar\\..\\'));
console.log(' :', path.relative('/node_module', '/@types/node'));
const name = join(__dirname, 'test.js');
console.dir(name);
console.dir(join(homedir(), 'test.js'));
console.dir(basename(name));
console.dir(dirname(name));
console.dir(extname(name));
console.dir(relative(name, homedir()));
console.dir(isAbsolute(name));
console.dir(isAbsolute('../DB'));
console.dir(resolve('../')); //'C:\\GitHab\\0Git'
console.dir(sep); //  / or \\
