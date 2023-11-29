interface Handler {
  next(handler: Handler): Handler;
  handle(request: string): string;
}

abstract class AbstractHandler implements Handler {
  private nextHandler!: Handler;

  public next(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string | any {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return false;
  }
}

class MonkeyHandler extends AbstractHandler {
  public override handle(request: string): string {
    if (request === 'Banana') {
      return `${request} <-- Monkey take`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHandler {
  public override handle(request: string): string {
    if (request === 'Nut') {
      return `${request} <-- Squirrel take`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHandler {
  public override handle(request: string): string {
    if (request === 'MeatBall') {
      return `${request} <-- Dog take`;
    }
    return super.handle(request);
  }
}

class HumanHandler extends AbstractHandler {
  public override handle(request: string): string {
    if (request === 'Cup of coffee') {
      return `${request} <-- Human take`;
    }
    return super.handle(request);
  }
}

class ChildHandler extends HumanHandler {
  public override handle(request: string): string {
    if (request === 'tea') {
      return `${request} <-- Child take`;
    }
    return super.handle(request);
  }
}

function CORCode(handler: Handler): void {
  const foods = ['Banana', 'Nut', 'Cup of coffee', 'MeatBall', 'tea'];

  for (const food of foods) {
    const result = handler.handle(food);
    if (result) {
      console.log('\x1b[32m%s\x1b[0m', `${result}`);
    } else {
      console.log('\x1b[31m%s\x1b[0m', `--> ${food} was left.`);
    }
  }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();
const human = new HumanHandler();
const child = new ChildHandler();

monkey.next(squirrel).next(dog);
human.next(monkey);
child.next(dog);

console.log('\x1b[33m%s\x1b[0m', `monkey`);
CORCode(monkey);
console.log('\x1b[33m%s\x1b[0m', `human`);
CORCode(human);
console.log('\x1b[33m%s\x1b[0m', `squirrel`);
CORCode(squirrel);
console.log('\x1b[33m%s\x1b[0m', `dog`);
CORCode(dog);
console.log('\x1b[33m%s\x1b[0m', `Child`);
CORCode(child);
