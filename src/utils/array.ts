export const isLastItem = (index: number, lenght: number) => index === lenght - 1;

export function filter<T extends RecordAny>(array: T[], predicate: [string | number, any]): T[] {
  const result: T[] = [];

  for(const item of array) {
    const [key, value] = predicate;

    if (item[key] === value) {
      result.push(item);
    }
  }

  return result;
}

