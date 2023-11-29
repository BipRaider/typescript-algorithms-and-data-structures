function MyPropertyDecorator(_target: Object, _propertyKey: string) {}

function format(target: Object, propertyKey: string) {
  let _val = this[propertyKey];

  var getter = function () {
    return 'Mr./Ms.' + _val;
  };

  var setter = function (newVal: string) {
    _val = newVal;
  };

  if (delete this[propertyKey]) {
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
    });
  }
}

class User {
  @format
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  print(): void {
    console.log(this.name);
  }
}
let tom = new User('Tom');
tom.print();
tom.name = 'Tommy';
tom.print();
