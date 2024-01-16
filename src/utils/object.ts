import { isMap, isObject } from './type';

export function omit<T extends RecordAny, K extends keyof T>(data: T, props: readonly K[]) {
  const result = Object.assign({}, data) as Omit<T, K>;
  props.forEach((prop) => {
    Reflect.deleteProperty(result, prop);
  });
  return result;
}

export function pick<T extends RecordAny, K extends keyof T>(data: T, props: readonly K[]) {
  const result = {} as Pick<T, K>;
  props.forEach((prop) => {
    if (data.hasOwnProperty(prop)) {
      result[prop] = data[prop];
    }
  });
  return result;
}

export function normMapToName(normMap?: RecordAny) {
  if (isObject(normMap)) {
    return Object.entries(normMap).map(item => item.join(',')).join(';');
  }
  return '';
}

export function enumToOptions(enums: RecordAny) {
  const options: Record<'label' | 'value', any>[] = [];

  if (isMap(enums)) {
    enums.forEach((label, value) => {
      options.push({ label, value });
    });
  }

  if (isObject(enums)) {
    Object.entries(enums).forEach(([value, label]) => {
      options.push({ label, value });
    })
  }

  return options;
}
