import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { View, ViewProps } from 'react-native';
import { useSetState } from '@/hooks';
import { FieldContext, FormContext } from './context';
import { FormContextProps, FormInstance } from './typings';

interface FormProps<V = any> extends ViewProps, FormContextProps {
  initialValues?: V;
}

const InternalForm = forwardRef<FormInstance, FormProps>(function Form(props, ref) {
  const { initialValues = {}, layout, labelWidth, colon = true, ...restProps } = props;
  const storeRef = useRef();
  const [state, setState] = useSetState(initialValues);

  storeRef.current = state;

  const formInstance = useMemo(() => {
    return {
      getValue: (name: string) => {
        return storeRef.current?.[name]
      },
      setValue: (name: string, value: any) => {
        setState({
          [name]: value
        });
      },
      getValues: () => storeRef.current || {},
      setValues: setState,
    }
  }, []);

  useImperativeHandle(ref, () => formInstance);

  return (
    <FormContext.Provider value={{ colon, layout, labelWidth }}>
      <FieldContext.Provider value={{ store: state, ...formInstance }}>
        <View {...restProps} />
      </FieldContext.Provider>
    </FormContext.Provider>
    
  )
})

export default InternalForm;
