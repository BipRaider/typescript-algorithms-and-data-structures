import Emitter from 'events';
console.dir('--------------Events----------start----------');

export const emitter = new Emitter();
const funcForEvent = (...data: any) => console.log('event--->', data);

emitter.once('message-once', funcForEvent);
emitter.on('message', (data, second) => {
  console.log('message-data : ', data);
  console.log('message-second : ', second);
  return data;
});

emitter.addListener('message', funcForEvent);
emitter.emit('message', funcForEvent);
emitter.prependListener('message-once', funcForEvent);
emitter.prependOnceListener('message-once', funcForEvent);
//
const log = emitter.rawListeners('message');
console.dir(log[0]('вернёт данные из emitter.on message'));
console.dir(log[0]('вернёт данные из emitter.on message').listener());

emitter.removeListener('message', funcForEvent);
emitter.off('message', funcForEvent);
emitter.removeAllListeners;

emitter.setMaxListeners;
emitter.getMaxListeners;
emitter.listenerCount;
emitter.listeners;
emitter.eventNames;
console.dir('--------------Events----------end----------');
