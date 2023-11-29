interface Product {
  operation(): string;
}
//-------------
class ConcreteProduct1 implements Product {
  public operation(): string {
    return '\x1b[33m{Result of the ConcreteProduct_1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '\x1b[33m{Result of the ConcreteProduct_2}';
  }
}
class ConcreteProduct3 implements Product {
  public operation(): string {
    return '\x1b[33m{Result of the ConcreteProduct_2}';
  }
}
//----------------
abstract class Creator {
  public abstract factoryMethod(f?: FTK): Product;

  public someOperation(f?: FTK): string {
    const product = this.factoryMethod(f);
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}
//--------------
class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}
class ConcreteCreator3 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct3();
  }
}
//----------other method realization factory
const FACTORY_TYPE = {
  f1: ConcreteProduct1,
  f2: ConcreteProduct2,
  f3: ConcreteProduct3,
};

type FT = typeof FACTORY_TYPE;
type FTK = keyof FT;

class OtherFactory extends Creator {
  public factoryMethod<T extends FTK>(factory: T): Product {
    return new FACTORY_TYPE[factory]();
  }
}

//------------------
function FactoryCode(creator: Creator, f?: FTK): void {
  console.log('\x1b[34m%s\x1b[0m', `Client: I'm not aware of the creator's class, but it still works.`, '\x1b[31m', f);
  console.log('\x1b[32m%s\x1b[0m', creator.someOperation(f));
}

//-----------------
console.log('\x1b[33m%s\x1b[0m', 'App: Launched with the ConcreteCreator_1.');
FactoryCode(new ConcreteCreator1());
console.log('');

console.log('\x1b[33m%s\x1b[0m', 'App: Launched with the ConcreteCreator_2.');
FactoryCode(new ConcreteCreator2());

console.log('\x1b[33m%s\x1b[0m', 'App: Launched with the ConcreteCreator_1.');
FactoryCode(new OtherFactory(), 'f1');
FactoryCode(new OtherFactory(), 'f2');
FactoryCode(new OtherFactory(), 'f3');
