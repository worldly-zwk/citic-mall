export const isTrue = <T = any>(condition = false, value: T) => condition ? value : null;

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export const isObject = (value: any): value is object => typeof value === 'object' && value !== null;

export const isFunction = (value: any): value is Function => typeof value === 'function';

export const isMap = (value: any): value is Map<any, any> => Object.prototype.toString.call(value) === '[object Map]';
