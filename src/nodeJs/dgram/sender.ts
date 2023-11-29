import dgram, { Socket } from 'node:dgram';
import { Buffer } from 'node:buffer';

const message: Buffer = Buffer.from(' Some bytes ');
const message1: Buffer = Buffer.from(' Some bytes 1');
const message2: Buffer = Buffer.from(' Some bytes 2');
const message3: Buffer = Buffer.from(' Some bytes 3');
const message4: Buffer = Buffer.from(' Some connect bytes 1');
const message5: Buffer = Buffer.from('stop server');
const message6: Buffer = Buffer.from(' Some connect bytes 2');

const client: Socket = dgram.createSocket({ type: 'udp4' });

client.bind(
  {
    address: 'localhost',
    port: 8081,
    exclusive: true,
  },
  () => {
    // client.addMembership('224.0.0.114');
  },
);

client.send([message, message1], 8080, 'localhost', (err: Error) => {
  client.emit('send', 1, err);
});

client.send(message2, 8080, 'localhost', (err: Error) => {
  client.emit('send', 2, err);
});

client.send(message3, 8080, 'localhost', (err: Error) => {
  client.emit('send', 3, err);
});

client.on('send', (...data) => {
  console.log('on', data);
  if (data[0] === 5) {
    client.close();
    console.dir('stop server');
  }
});

client.connect(8080, 'localhost', (): void => {
  console.dir('connected');
  console.log({
    connect: client.address(),
    bite_size_receive: client.getRecvBufferSize(),
    bite_size_send: client.getSendBufferSize(),
    listeners_max: client.getMaxListeners(),
    raw_listeners: client.rawListeners('send'),
  });

  client.send(message4, err => {
    client.emit('send', 4, err);
  });
  client.send(message6, err => {
    client.emit('send', 6, err);
  });

  client.on('send', (...data) => {
    console.log('connect on', data);
  });

  // client.disconnect();
});

console.log('--->', client.rawListeners('send'));

client.send(message5, 8080, 'localhost', (err: Error) => {
  if (err) {
    client.emit('send', 5, err.message);
    return;
  }
  client.emit('send', 5, err);
});
