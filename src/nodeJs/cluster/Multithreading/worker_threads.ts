import { parentPort, workerData } from 'worker_threads';

parentPort?.postMessage;
console.log(workerData);
parentPort?.postMessage('return data to parent');
parentPort?.close();
