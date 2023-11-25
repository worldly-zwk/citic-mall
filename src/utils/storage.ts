import AsyncStorage from '@react-native-async-storage/async-storage';
import { isObject } from './type';


class Storage {
  async getItem(key: string) {
    const result = await AsyncStorage.getItem(key);

    return result && JSON.parse(result);
  }

  setItem<T>(key: string, value: T) {
    let data = `${value}`;
    if (isObject(value)) {
      data = JSON.stringify(value);
    }
    return AsyncStorage.setItem(key, data);
  }

}

export default new Storage();
