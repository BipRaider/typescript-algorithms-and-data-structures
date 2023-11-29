// https://learn.javascript.ru/proxy
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy


let user = {
  name: 'Вася',

  _password: '***',
  start: 1,
  end: 10,
  // ...
  checkPassword(value) {

    return value === this._password;
  },
  _name2: 'Гость',
  get name2() {
    return this._name2;
  },
};

let userProxy = new Proxy(user, {

  get(target, prop) {
    if (typeof prop !== 'symbol' && prop.startsWith('_')) {
      throw new Error('error');
    } else {
      let value = target[prop];

      return typeof value === 'function' ? value.bind(target) : value;
    }
  },

  set(target, prop, val) {

    if (typeof prop !== 'symbol' && prop.startsWith('_')) {
      throw new Error('error');
    } else {
      target[prop] = val;
      return true;
    }
  },

  deleteProperty(target, prop) {

    if (typeof prop !== 'symbol' && prop.startsWith('_')) {
      throw new Error('error');
    } else {
      delete target[prop];
      return true;
    }
  },


  ownKeys(target) {

    return Object.keys(target).filter(key => !key.startsWith('_'));
  },
  /***
   ** alert(5 in range);
   */
  has(target, prop) {
    return Number(prop) >= target.start && Number(prop) <= target.end;
  },

  apply(target, thisArg, args) {
    // @ts-ignore
    target.apply(thisArg, args);
  },


});


try {
  alert(userProxy._password); // Error:
} catch (e) {
  alert(e.message);
}

// "set"  _password
try {
  userProxy._password = 'test'; // Error
} catch (e) {
  if (e instanceof Error) alert(e.message);
}

// "deleteProperty"  _password
try {
  delete userProxy._password; // Error
} catch (e) {
  if (e instanceof Error) alert(e.message);
}


for (let key in user) alert(key); //

// -----------------------------

const userProxy1 = new Proxy(user, {
  get(target, prop, adminThis) {
    // adminThis = admin
    return Reflect.get(target, prop, adminThis); // (*)
  },
});

const admin: any = {
  _name2: 'Админ',
};

admin.__proto__ = userProxy1;


alert(admin.name2);

// ---------------------------

let map = new Map();

let proxy1 = new Proxy(map, {
  get(target, prop, receiver) {
    // @ts-ignore
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  },
});

proxy1.set('test', 1);
alert(proxy1.get('test')); // 1

// ----------------------------------

class User {
  #name = 'Гость';

  getName() {
    return this.#name;
  }
}

let user3 = new User();

user3 = new Proxy(user3, {
  get(target, prop, receiver) {
    // @ts-ignore
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  },
});

alert(user3.getName());

// -------------

let object = {
  data: 'Важные данные',
};

let { proxy, revoke } = Proxy.revocable(object, {});


alert(proxy.data);


revoke();


alert(proxy.data);
