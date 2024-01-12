import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { View, ViewProps } from 'react-native';
import { FieldContext, FormContext } from './context';
import { FormContextProps } from './typings';
import useForm, { FormInstance } from './hooks/useForm';

interface FormProps<V = any> extends ViewProps, FormContextProps {
  form?: FormInstance;
  initialValues?: V;
}

const InternalForm = forwardRef<FormInstance | undefined, FormProps>(function Form(props, ref) {
  const { form, initialValues = {}, layout, labelWidth, colon = true, ...restProps } = props;
  const formInstance = useForm(form);
  const { setInitialValues } = formInstance.getInternalHooks();

  const mountRef = useRef(false);
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }

  useImperativeHandle(ref, () => formInstance);

  return (
    <FormContext.Provider value={{ colon, layout, labelWidth }}>
      <FieldContext.Provider value={formInstance}>
        <View {...restProps} />
      </FieldContext.Provider>
    </FormContext.Provider>
    
  )
})

export default InternalForm;
