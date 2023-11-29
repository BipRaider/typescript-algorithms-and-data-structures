interface IUserDecoratorMethod {
  users: number;
  getUsers(): number;
}

function UpDateMethodBeforeStart(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
) {
  console.log('target -->', target);
  console.log('propertyKey -->', propertyKey);
  console.log('descriptor -->', descriptor);

  /** descriptor -->
  value: [Function: getUsers1],
  writable: true,
  enumerable: false,
  configurable: true
  get?: () => T;
  set?: (value: T) => void;
   */
}

function UpDateMethodBeforeStartPlusData(...params: any[]) {
  console.log('UpDateMethodBeforeStartPlusData');
  return (
    _target: Object,
    _propertyKey: PropertyKey,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>,
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    descriptor.value = () => params;
  };
}

function CatchDecorator(
  { reThrow, reAsync }: { reThrow?: boolean; reAsync?: boolean } = { reThrow: false, reAsync: false },
) {
  console.log('CatchDecorator');
  // const t = 'ssssss';
  return (_target: Object, _propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) => {
    const oldValue = descriptor.value;
    reAsync
      ? (descriptor.value = async (...args: any[]) => {
          try {
            console.log('args ->', args);
            return await oldValue?.apply(_target, args);
          } catch (e) {
            if (e instanceof Error) {
              console.dir(e.message);
              if (reThrow) throw new Error('We have error');
            }
          }
        })
      : (descriptor.value = (...args: any[]) => {
          try {
            console.log('args ->', args);
            return oldValue?.apply(_target, args);
          } catch (e) {
            if (e instanceof Error) {
              console.dir(e.message);
              if (reThrow) throw new Error('We have error');
            }
          }
        });
  };
}

class UserDecoratorMethod implements IUserDecoratorMethod {
  users: number = 1000;
  constructor(public age: number = 4) {}

  @UpDateMethodBeforeStart
  getUsers(...d: string[]): any {
    return { ...d };
  }
  @UpDateMethodBeforeStartPlusData('ssss', { ggg: 'ggg' }, 'fff')
  getUsers1(data: any): any {
    console.log('getUsers1', data);
  }
  @CatchDecorator({ reAsync: false })
  getError(t: boolean) {
    if (t) ({ t });
    else throw new Error('Помилка');
  }
}

console.log('1--->', new UserDecoratorMethod().getUsers('sf'));
console.log('2--->', new UserDecoratorMethod().getUsers1('gggggggggggggg'));
console.log('3--->', new UserDecoratorMethod().getError(true));
