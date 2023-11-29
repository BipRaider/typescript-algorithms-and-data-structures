export interface IProvider {
  send(message: string | object): void;
  connected(config: string): void;
  disconnected(): void;
}

export class Telegram implements IProvider {
  send(message: string | object): void {
    console.log('\x1b[32m%s\x1b[0m', 'Telegram ->', message);
  }
  connected(config: string): void {
    console.log('\x1b[32m%s\x1b[0m', 'Telegram ->', config);
  }
  disconnected(): void {
    console.log('\x1b[32m%s\x1b[0m', 'Disconnected Telegram');
  }
}

export class WhatsUp implements IProvider {
  send(message: string | object): void {
    console.log('\x1b[33m%s\x1b[0m', 'WhatsUp ->', message);
  }
  connected(config: string): void {
    console.log('\x1b[33m%s\x1b[0m', 'WhatsUp ->', config);
  }
  disconnected(): void {
    console.log('\x1b[33m%s\x1b[0m', 'Disconnected WhatsUp');
  }
}

export default class Bridge {
  constructor(public provider: IProvider) {}

  send(message: string | object) {
    console.log('\x1b[35m%s\x1b[0m', 'Send message');
    this.provider.connected('connected telegram');
    this.provider.send(message);
    this.provider.disconnected();
  }
}

class DelayBridge extends Bridge {
  constructor(provider: IProvider) {
    super(provider);
  }

  sendDelayed(time: number = 0, message: string | object) {
    setTimeout(() => {
      console.log('\x1b[31m%s\x1b[0m', 'Send delayed message');
      this.send(message);
    }, time);
  }
}

const sender_T = new Bridge(new Telegram());
const sender_WU = new Bridge(new WhatsUp());
sender_T.send('T');
sender_WU.send('WU');
const sender_T_D = new DelayBridge(new Telegram());
const sender_WU_D = new DelayBridge(new WhatsUp());
sender_T_D.sendDelayed(1_000, 'T');
sender_WU_D.sendDelayed(2_000, 'WU');
