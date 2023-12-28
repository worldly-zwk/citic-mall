import { NativeSyntheticEvent } from 'react-native';

export function getValueFromEvent(event: NativeSyntheticEvent<any>) {
  if (event.nativeEvent) {
    return event.nativeEvent.text || event.nativeEvent.value;
  }

  return event;
}
