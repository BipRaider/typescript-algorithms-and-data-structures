import 'reflect-metadata';

function regex(pattern: string) {
  let expression = new RegExp(pattern);

  return function regex(target: Object, propertyName: string) {
    let newValue: any;

    var getter = function () {
      return newValue;
    };

    var setter = function (newVal: string) {
      try {
        let isValid: boolean = expression.test(newVal);

        if (isValid === false) {
          throw new Error(`Value ${newVal} does not match ${pattern}`);
        }
        newValue = newVal;
        console.log(`${newVal} is valid`);
      } catch (error: any) {
        throw error.message;
      }
    };

    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
    });
  };
}

class Account {
  @regex('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  email: string;

  @regex('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$')
  phone: string;

  constructor(email: string, phone: string) {
    this.email = email;
    this.phone = phone;
  }
}

let acc = new Account('bir@gmail.com', '+23451235678');
// acc.email = 'bir_iki_yedi';
console.dir(acc.email);

acc.email = 'bir1@gmail.com';
console.dir(acc.email);
acc.email = 'bir_iki_yedi';
console.dir(acc.email);
