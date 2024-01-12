import { useEffect, useRef, useState } from 'react';
import { FormInstance } from './useForm';
import { getValue } from '../utils';

export default function useWatch(namePath: string, form: FormInstance) {
  const [value, setValue] = useState<any>();

  const valueRef = useRef(value);
  valueRef.current = value;

  const namePathRef = useRef(namePath);
  namePathRef.current = namePath;

  useEffect(() => {
    const initialValue = form.getFieldValue(namePath);
    const { registerWatch } = form.getInternalHooks();

    const cancelRegister = registerWatch((values) => {
      const newValue = getValue(values, namePathRef.current);

      if (newValue !== valueRef.current) {
        setValue(newValue);
      }
    });

    if (initialValue !== valueRef.current) {
      setValue(initialValue);
    }
    
    return cancelRegister;
  }, []);

  return value;
}