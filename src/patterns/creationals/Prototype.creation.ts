interface Prototype<T> {
  clone: () => T;
}

class PrototypeExempla implements Prototype<PrototypeExempla> {
  createAt: Date = new Date();

  constructor(public name: string, public age: number) {}

  clone(): PrototypeExempla {
    const clone = new PrototypeExempla(this.name, this.age);
    clone.createAt = this.createAt;
    return clone;
  }
}

const user = new PrototypeExempla('third', 22);
console.log('\x1b[35m%s\x1b[0m', '-->', user);
const user_1 = user.clone();
console.log('\x1b[34m%s\x1b[0m', '-->', user_1);
user_1.name = 'first';
console.log('\x1b[33m%s\x1b[0m', '-->', user_1);
console.log('\x1b[32m%s\x1b[0m', '-->', user);
console.log('\x1b[31m%s\x1b[0m', 'END');
