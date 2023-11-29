import dgram, { RemoteInfo, Socket } from 'node:dgram';
import { Buffer } from 'node:buffer';

export const getData = async <RES, REQ>(data: RES): Promise<REQ | null> => {
  const serverPort = 23333;
  const clientPort = 23334;

  const client: Socket = dgram.createSocket({ type: 'udp4' });
  client.bind({
    address: 'localhost',
    port: clientPort,
    exclusive: true,
  });

  return await new Promise<REQ | null>((res, rej): void => {
    const payload = Buffer.from(JSON.stringify(data));

    client.connect(serverPort, 'localhost', (): void => {
      client.send(payload);

      client.on('message', (msg: Buffer, rinfo: RemoteInfo): void => {
        client.close();
        if (!msg) res(null);
        if (rinfo.port === serverPort) {
          const received = msg.toString();
          const parse: REQ = JSON.parse(received);
          res(parse);
        }
        res(null);
      });

      client.on('error', (err: Error): void => {
        rej(err.message);
        client.close();
      });
    });
  });
};
