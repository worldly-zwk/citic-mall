import { useCallback, useEffect, useState } from 'react';
import storage from '@/utils/storage';

const useStorage = <T = any>(key: string, defaultValue: T) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    storage.getItem(key).then(value => {
      setState(value);
    })
  }, []);

  const setStorage = useCallback((value: T) => {
    return storage.setItem(key, value);
  }, []);

  return [state, setStorage];
}

export default useStorage;
