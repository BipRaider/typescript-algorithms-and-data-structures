interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

function decorator(_target: Object, _propertyName: string, _descriptor: PropertyDescriptor) {

  //  PropertyDescriptor.
}

function validator(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const oldSet = descriptor.set;

  descriptor.set = function (value: string) {
    if (value === 'admin') {
      throw new Error('Invalid value');
    }
    if (oldSet !== undefined) oldSet.call(this, value);
  };
}

class User1 {
  private _name!: string;
  constructor(name: string) {
    this.name = name;
  }

  public get name(): string {
    return this._name;
  }
  @validator
  public set name(n: string) {
    this._name = n;
  }
}

let tom1 = new User1('Tom');

console.log(tom1.name);
tom1.name = 'admin';
console.log(tom1.name);
