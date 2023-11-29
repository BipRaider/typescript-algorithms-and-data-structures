import 'reflect-metadata';
const ARGS_A = Symbol('ARGS_A');

function ArgsA(...params: any[]) {
  console.log('\x1b[33m%s\x1b[0m', 'ArgsA-start-->', params);
  return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    const argsMeta: number[] = Reflect.getOwnMetadata(ARGS_A, target, propertyKey) || [];
    argsMeta.push(parameterIndex);
    Reflect.defineMetadata(ARGS_A, argsMeta, target, propertyKey);
    console.log('\x1b[33m%s\x1b[0m', 'ArgsA-end-->');
  };
}

function Valid(args: number) {
  console.log('\x1b[32m%s\x1b[0m', 'Valid-start-->', args);
  return (target: Object, propertyKey: string | symbol, desc: TypedPropertyDescriptor<(...args: any[]) => any>) => {
    const method = desc.value;

    desc.value = function name(...payload: any) {
      const params: number[] = Reflect.getOwnMetadata(ARGS_A, target, propertyKey);
      if (params) {
        for (let key of params) {
          console.log('\x1b[32m%s\x1b[0m', 'Valid-end-->', payload[key]);
          if (payload[key] < args) {
            throw new Error('This argument most be is the bigger  0 ');
          }
        }
      }

      return method?.apply(this, payload);
    };

    console.log('\x1b[32m%s\x1b[0m', 'Valid-end-->', args);
  };
}

class UserDecoratorArgs {
  @Valid(5)
  getUsers(@ArgsA(1) args: number): void {
    console.log('\x1b[34m%s\x1b[0m', 'getUsers-->', args);
  }
}
const UArgs = new UserDecoratorArgs();
UArgs.getUsers(5);
