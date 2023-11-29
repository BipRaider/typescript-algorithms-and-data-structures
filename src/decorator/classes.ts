function classDecoratorFn(_constructor: Function) {}

function sealed(constructor: Function) {
  console.log('sealed decorator');
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Classes {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  print(): void {
    console.log(this.name);
  }
}

Object.defineProperty(Classes, 'age', {
  value: 17,
});
