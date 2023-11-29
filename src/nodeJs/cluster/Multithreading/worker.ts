//https://nodejs.org/api/worker_threads.html

import WorkerAll from 'worker_threads';

const { Worker, isMainThread } = WorkerAll;

const start = (data: any) => {
  const worker = new Worker('./worker_threads.ts', {
    workerData: { name: 'name', ...data },
  });
  worker.postMessage({ file: './worker.ts' });

  worker.on('online', () => {});
  worker.on('message', (payload: any) => {});
  worker.on('messageerror', () => {});
  worker.on('error', () => {});
  worker.on('exit', (code: any) => {});

  console.log('worker id ->', worker.threadId); // id worker's
};
