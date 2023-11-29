// https://learn.javascript.ru/proxy#reflect
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect
let user1 = {
  name: 'vasy',
};

// Reflect API

user1 = new Proxy(user1, {
  get(target, prop, receiver) {
    // alert(`GET ${prop}`);
    // Reflect.get
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    // alert(`SET ${prop}=${val}`);
    // Reflect.set  true or false.
    return Reflect.set(target, prop, val, receiver); // (2)
  },
});

let nameReflect = user1.name; // "GET name"
user.name = 'pety'; // "SET
