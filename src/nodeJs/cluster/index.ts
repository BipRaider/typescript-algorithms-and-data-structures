import cluster, { Worker } from 'node:cluster';
import http from 'node:http';

if (cluster.isPrimary) {
  console.log(`Primary is running`);

  const worker_1 = cluster.fork();
  const worker_2 = cluster.fork();

  cluster.on('fork', (worker: Worker) => {
    console.log('worker is dead:', worker.isDead());
  });

  cluster.on('exit', (worker: Worker, code, signal) => {
    console.log({ worker: worker.process.pid, code, signal });
    const newWorker = cluster.fork();
    newWorker.send(`hello new worker ${newWorker.process.pid}`);
  });

  cluster.on('listening', (worker: Worker, address) => {
    console.log(`A worker is now connected to ${address.addressType}:${address.port}`);
  });

  cluster.on('online', (worker: Worker) => {
    console.log(`Yay, the worker responded after it was forked ${worker.process.pid}`);
  });

  worker_1.send(`hello worker ${worker_1.process.pid}`);
  worker_2.send(`hello worker ${worker_2.process.pid}`);

  cluster.on('message', (worker: Worker, msg, handler) => {
    console.dir({ pid: worker.process.pid, msg, handler });
  });
} else {
  process.on('message', msg => {
    console.log(`${process.pid} =>`, msg);
  });

  console.log('isWorker:', cluster.isWorker);

  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`hello world ${process.pid}`);
      process.send(`hello world ${process.pid}`);

      // process.kill(process.pid);
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
