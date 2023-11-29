import dgram, { RemoteInfo, Socket } from 'node:dgram';
import { AddressInfo } from 'node:net';

const controller = new AbortController();
const { signal } = controller;

export const server: Socket = dgram.createSocket({ type: 'udp4', signal: signal });

server.bind({
  address: 'localhost',
  port: 8080,
  exclusive: true,
});

server.on('error', (err: Error) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg: Buffer, rinfo: RemoteInfo) => {
  console.dir(msg.toString());

  if (msg.toString() === 'stop server') controller.abort();

  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address: AddressInfo = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on('send_stop', (...data) => {
  console.dir(data);
});

console.dir(server.listenerCount('message')); //1
