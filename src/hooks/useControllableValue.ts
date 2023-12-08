import { SetStateAction, useCallback, useMemo, useRef } from 'react';
import { isFunction } from '@/utils/type';
import useUpdate from './useUpdate';

interface Options<T = any> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
}

interface Props {
  [key: string]: any;
}

function useControllableValue<T = any>(props: Props, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange'
  } = options;

  const value = props[valuePropName] as T;
  const isControlled = props.hasOwnProperty(valuePropName);

  const initialValue = useMemo(() => {
    if (isControlled) {
      return value;
    }

    if (props.hasOwnProperty(defaultValuePropName)) {
      return props[defaultValuePropName];
    }

    return defaultValue;
  }, []);

  const update = useUpdate();
  const stateRef = useRef(initialValue);
  
  if (isControlled) {
    stateRef.current = value;
  }

  const setState = useCallback((value: SetStateAction<T>, ...args: any[]) => {
    const data = isFunction(value) ? value(stateRef.current) : value;

    if (!isControlled) {
      stateRef.current = data;
      update();
    }

    if (props[trigger]) {
      props[trigger](data, ...args);
    }
  }, []);

  return [stateRef.current, setState] as const;
}

export default useControllableValue;
