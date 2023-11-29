interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

function deprecated(_target: any, _propertyName: string, _descriptor: PropertyDescriptor) {
  console.log('Method is deprecated');

  // PropertyDescriptor:
}
