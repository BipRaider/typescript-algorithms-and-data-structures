function readable(_target: Object, _propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}

class User4 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @readable
  print(): void {
    console.log(this.name);
  }
}

let tom4 = new User4('Tom');

tom4.print = function () {
  console.log('print has been changed');
};
tom4.print(); // Tom
