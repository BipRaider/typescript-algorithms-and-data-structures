interface Command1 {
  execute(): void;
}

class SimpleCommand implements Command1 {
  constructor(private payload: string) {}
  public execute(): void {
    console.log(`Doing simple command... ${this.payload}`);
  }
}

class ComplexCommand implements Command1 {
  constructor(private receiver: AReceiver, private a: string, private b: string) {}
  public execute(): void {
    this.start();
    this.receiver.doSimpleCommand(this.a);
    this.receiver.doSomethingElse(this.b);
  }
  private start = () => console.log('Doing complex command...');
}

abstract class AReceiver {
  abstract doSimpleCommand(a: string): void;
  abstract doSomethingElse(b: string): void;
}

class Receiver extends AReceiver {
  doSimpleCommand(a: string) {
    console.log(`Reciever doing something... ${a}`);
  }
  doSomethingElse(b: string) {
    console.log(`Reciever not doing something... ${b}`);
  }
}
///
class Invoker {
  onStart: Command1;
  onFinish: Command1;

  doOnStart(command: Command1) {
    this.onStart = command;
  }
  doOnFinish(command: Command1) {
    this.onFinish = command;
  }

  doSomethingGreat() {
    if (this.check(this.onStart)) {
      this.onStart.execute();
    }

    console.log('doSomethingImportant');

    if (this.check(this.onFinish)) {
      this.onFinish.execute();
    }
  }

  check(obj: Command1): obj is Command1 {
    return obj.execute !== undefined;
  }
}

class Manager {
  commands: Command1[] = [];

  execute() {
    console.log('doSomethingImportant');

    const validCommands = this.commands.filter(command => this.check(command));
    validCommands.forEach(command => command.execute());
  }

  addCommand(command: any) {
    this.commands.push(command);
  }

  check(obj: Command1): obj is Command1 {
    return obj.execute !== undefined;
  }
}

const invoker = new Invoker();
invoker.doOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.doOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

const manager = new Manager();
manager.addCommand(new SimpleCommand('Eat'));
manager.addCommand(new SimpleCommand('Walk'));
manager.addCommand('test');
manager.addCommand(new SimpleCommand('Eat'));
manager.addCommand(new ComplexCommand(receiver, 'Send email', 'Save report'));
manager.execute();

// invoker.doSomethingGreat();
