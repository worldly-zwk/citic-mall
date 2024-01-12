import { NativeSyntheticEvent } from 'react-native';

export function getValue<S extends RecordAny = RecordAny>(store: S, namePath: string) {
  return store[namePath];
}

export function setValue<S extends RecordAny = RecordAny>(store: S, namePath: string, value: any) {
  return Object.assign({}, store, {
    [namePath]: value
  });
}

export function cloneByNamePathList(store: RecordAny, namePathList: string[]): RecordAny {
  let newStore = {};
  namePathList.forEach(namePath => {
    const value = getValue(store, namePath);
    newStore = setValue(newStore, namePath, value);
  });

  return newStore;
}

export function getValueFromEvent(event: NativeSyntheticEvent<any>) {
  if (event.nativeEvent) {
    return event.nativeEvent.text || event.nativeEvent.value;
  }

  return event;
}
