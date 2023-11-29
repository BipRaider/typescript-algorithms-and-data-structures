interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  operation(): string {
    return 'ConcreteComponent';
  }

  sendEmail() {
    console.log('Email');
  }

  sendWhatsup() {
    console.log('Whatsup');
  }

  sendTelegram() {
    console.log('Telegram');
  }

  sendOptional(params: { telegram: boolean; whatsup: boolean; email: boolean }) {
    if (params.telegram) this.sendTelegram();
    if (params.whatsup) this.sendWhatsup();
    if (params.email) this.sendEmail();
  }
}

class Decorator implements Component {
  constructor(public component: Component) {}

  operation(): string {
    return this.component.operation();
  }
}

class Decorator1 extends Decorator {
  sendEmail() {
    console.log('Email');
  }

  override operation(): string {
    this.sendEmail();
    return `Decorator1(${super.operation()})`;
  }
}

class Decorator2 extends Decorator {
  sendWhatsup() {
    console.log('Whatsup');
  }

  override operation(): string {
    this.sendWhatsup();
    return `Decorator2(${super.operation()})`;
  }
}

class Decorator3 extends Decorator {
  sendTelegram() {
    console.log('Telegram');
  }

  sendTelegram2() {
    console.log('Telegram');
  }

  sendTelegram3() {
    console.log('Telegram');
  }

  override operation(): string {
    this.sendTelegram();
    return `Decorator3(${super.operation()})`;
  }
}

function client(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

const simple = new ConcreteComponent();
const decorator1 = new Decorator1(simple);
const decorator2 = new Decorator2(decorator1);
const decorator3 = new Decorator3(decorator2);

if ((decorator3.component as Decorator2).component as Decorator1) {
  console.log('test', ((decorator3.component as Decorator2).component as Decorator1).sendEmail());
}

client(simple);
client(decorator1);
client(decorator2);
client(decorator3);
