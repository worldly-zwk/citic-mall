import { isObject } from "./type";

function pick<T extends RecordAny, K extends keyof T>(data: T, props: readonly K[]) {
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
