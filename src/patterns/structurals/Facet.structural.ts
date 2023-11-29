import Bridge, { Telegram, WhatsUp } from './Bridge.structural';
import Builder from '../creationals/Builder.creation';
import Singleton from '../creationals/Singleton.creation';

interface IFacer {
  send: (to: string, message: string) => void;
}

export default class Facer implements IFacer {
  private singleton: Singleton;
  private builder: Builder;
  private bridge: Bridge;

  constructor(sender: Telegram | WhatsUp) {
    this.singleton = Singleton.getInstance();
    this.builder = new Builder();
    this.bridge = new Bridge(sender);
  }

  send = (to: string, message: string): void => {
    console.log('\x1b[32m%s\x1b[0m', 'Facer started send ----------------------------- ');
    this.singleton.data = [to, message];
    console.log('\x1b[35m%s\x1b[0m', '-->', this.singleton.size());
    const template = this.singleton.get(to);
    const data = this.builder.addJpg().addPng().addResolution(100, 100).build();
    this.bridge.send({ template, data, to });
    console.log('\x1b[33m%s\x1b[0m', 'Facer ended send -------------------------------');
  };
}

new Facer(new WhatsUp()).send('WhatsUp', 'This template form my friend facer');
new Facer(new Telegram()).send('Telegram', 'This template form my friend facer');
