import os, { homedir } from 'os';

console.dir('------------------OS--start---------------------');
console.log('os.platform', os.platform());
console.log('os.arch', os.arch());
console.log('os.cpus', os.cpus());
console.log('os.cpus.length', os.cpus().length);
console.log(homedir()); // c/User/User
// console.log(os.uptime() / 60 / 60 / 24);
// console.log(os.arch());
// console.log(os.getPriority());
// console.log(os.platform());
// console.log(os.userInfo());
//console.log(os.networkInterfaces());
console.log(os.freemem());
console.log(os.totalmem());

console.dir('------------------OS-----end-------------------');
