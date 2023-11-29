import 'reflect-metadata';
/**
 * 1 step :
 *Enter -> property ->  Exit
 *Enter -> set/get -> argument -> argument -> set/get ->  Exit
 *Enter -> method -> argument -> argument -> method -> Exit
 *2 step static:
 *Enter -> static property -> Exit
 *Enter -> static method -> argument -> argument -> static method -> Exit
 *3 step class
 *Enter -> class -> argument -> argument -> class -> Exit
 */

/**
 * @param params Data for update that come at method, class, property, arguments
 * @returns Function decorator for method, class, property, arguments
 */
function Uni<T>(params: string) {
  console.log('\x1b[35m%s\x1b[0m', `Uni-params-${params}->`, params);
  return function (
    _target?: Object,
    _propertyKey?: string | symbol,
    _desc?: TypedPropertyDescriptor<(...args: any[]) => any> | number | T,
  ) {
    console.log('\x1b[32m%s\x1b[0m', `Uni-targe-${String(_propertyKey)}->`, _target);
    console.log('\x1b[32m%s\x1b[0m', `Uni-propertyKey-${String(_propertyKey)}->`, _propertyKey);
    console.log('\x1b[32m%s\x1b[0m', `Uni-desc-${String(_propertyKey)}->`, _desc);

    console.log('\x1b[30m%s\x1b[0m', `Uni-end->`);
  };
}

@Uni('Class')
class DecoratorAllData {
  @Uni('Params')
  _prop: string;

  @Uni('Params_static')
  static propStatic: string;

  constructor(@Uni('Args_constructor') _a: number) {}

  @Uni('Params_set')
  set prop(@Uni('Args') p: string) {
    this._prop = p;
  }

  @Uni('Method')
  method(@Uni('Args_method') a: number): number {
    console.log('\x1b[33m%s\x1b[0m', 'method-->', a);
    return a;
  }

  @Uni('Method_static')
  static methodStatic(@Uni('Args_method') a: number): number {
    console.log('\x1b[33m%s\x1b[0m', 'methodStatic-->', a);
    return a;
  }
}
//Inti class
const DecoratorAll = new DecoratorAllData(1);
DecoratorAll.method(3);
console.log('\x1b[33m%s\x1b[0m', 'DecoratorAll-->', DecoratorAll.prop);

//Static
DecoratorAllData.methodStatic(2);
console.log('\x1b[33m%s\x1b[0m', 'DecoratorAllData-->', DecoratorAllData.propStatic);
