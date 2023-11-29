import os from 'os';
import cluster from 'cluster';

//https://nodejs.org/api/worker_threads.html
//https://nodejs.org/api/cluster.html
console.dir('---------------os+cluster --------------');
// npm pm2 https://www.npmjs.com/package/pm2
const cpus = os.cpus();

// if (cluster.isMaster) {
//   for (let i = 0; i < cpus.length - 2; i++) {
//     console.dir(cpus[i]);
//     console.dir(process.pid);

//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.dir(`воркер стоп ${worker.process.pid}`);

//     if (!code) {
//       console.dir('value');
//     }

//     cluster.fork();
//     console.dir('Стар нового воркера ');
//   });
// } else {
//   setInterval(() => {
//     console.dir(process.pid);
//   }, 5000);
// }

console.dir('---------------os+cluster--end------------');

// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// async function lsExample() {
//   const { stdout, stderr } = await exec('ls');
//   console.log('stdout:', stdout);
//   console.error('stderr:', stderr);
// }
// lsExample();

console.dir('------------------------------');
