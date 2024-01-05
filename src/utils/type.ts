export const isTrue = <T = any>(condition: boolean, value: T) => condition ? value : null;

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export const isObject = (value: any): value is object => typeof value === 'object' && value !== null;

export const isFunction = (value: any): value is Function => typeof value === 'function';
