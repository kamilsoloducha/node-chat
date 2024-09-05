export function getAllMethods(type$: any): string[] {
  return Object.getOwnPropertyNames(type$.prototype)
    .filter((item) => item !== 'constructor')
    .filter((item) => {
      return typeof type$.prototype[item] === 'function';
    });
}

export function createMockObj(type: any): any {
  const methods = getAllMethods(type);
  const result = {};
  methods.forEach((method) => {
    result[method] = jest.fn();
  });
  return result;
}

export function createProvider(type: any): any {
  return {
    provide: type,
    useValue: jasmine.createSpyObj(type, getAllMethods(type)),
  };
}
