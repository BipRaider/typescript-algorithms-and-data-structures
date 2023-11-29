import { ChildProcessWithoutNullStreams, spawn, exec, fork, execFile } from 'child_process';

const execStart = exec('node -v', (err, stdout, stderr) => {
  console.dir(err);
  console.dir(stdout);
  console.dir(stderr);
});

execStart.on('message', (...args) => console.dir(args));
execStart.on('exit', (code: any) => console.dir(code));
execStart.on('close', () => {});
execStart.on('disconnect', () => {});
execStart.on('error', () => {});
execStart.on('spawn', () => {});

const execFile1 = execFile(__dirname + '/processNodejsImage.sh', (err, stdout, stderr) => {
  console.dir(err);
  console.dir(stdout);
  console.dir(stderr);
});

execFile1.on('message', (...args) => console.dir(args));
execFile1.on('exit', (code: any) => console.dir(code));
execFile1.on('close', () => {});
execFile1.on('disconnect', () => {});
execFile1.on('error', () => {});
execFile1.on('spawn', () => {});
//==========

const spawnStart = spawn('node', ['-v']);

spawnStart.stderr.on('error', () => {});
spawnStart.stdout.on('data', (...args) => console.dir(args));
spawnStart.stdin.on('pipe', (...args) => console.dir(args));
spawnStart.stdio;

//==========

const forkStart = fork('./worker.ts', {});
forkStart.send('Ping!', (err: any) => console.dir(err));

forkStart.on('message', (...args) => console.dir(args));
forkStart.on('exit', (code: any) => console.dir(code));
forkStart.on('close', () => {});
forkStart.on('disconnect', () => {});
forkStart.on('error', () => {});
forkStart.on('spawn', () => {});

process.on('message', args => {
  console.dir(args);

  if (args === 'disconnect') return process.disconnect();

  if (process.send) {
    process.send(
      'Pong!',
      (...data: any) => console.dir(data),
      {},
      (err: any) => console.dir(err),
    );
  }
});
