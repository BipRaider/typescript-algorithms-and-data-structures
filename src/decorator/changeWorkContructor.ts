function logger<T extends Function>(_target: T): T {
  let newConstructor: Function = function (this: any, name: string) {
    console.log('Creating new instance');
    this.name = name;
    this.age = 23;
    this.print = function (): void {
      console.log(this.name, this.age);
    };
  };
  return <T>newConstructor;
}

@logger
class User3 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  print(): void {
    console.log(this.name);
  }
}
let tom3 = new User3('Tom');
let bob = new User3('Bob');
tom.print();
bob.print();
