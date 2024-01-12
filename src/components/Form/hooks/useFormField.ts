import { useCallback, useContext, useEffect } from 'react';
import { NativeSyntheticEvent } from 'react-native';
import { useUpdate } from '@/hooks';
import { FieldProps } from '../typings';
import { getValueFromEvent } from '../utils';
import { FieldContext } from '../context';

export default function useFormField(fieldProps: FieldProps) {
  const {
    name,
    trigger = 'onChange',
    valuePropName = 'value',
  } = fieldProps;
  const update = useUpdate();
  const fieldContext = useContext(FieldContext);

  useEffect(() => {
    const { registerField } = fieldContext.getInternalHooks();

    const cancelRegister = registerField({
      getNamePath: () => fieldProps.name,
      onStoreChange: update,
    });

    return () => {
      cancelRegister();
    }
  }, []);

  return useCallback((childProps: RecordAny) => {
    const originTriggerFunc = childProps[trigger];
    const controlProps = { ...childProps };
    if (name) {
      const { dispatch } = fieldContext.getInternalHooks();
      controlProps[valuePropName] = fieldContext.getFieldValue(name);
      controlProps[trigger] =  (event: NativeSyntheticEvent<any>) => {
        dispatch({
          type: 'updataValue',
          namePath: name,
          value: getValueFromEvent(event),
        });
        originTriggerFunc?.(event);
      }
    }
    return controlProps;
  }, [name, trigger, valuePropName, fieldContext]);
}