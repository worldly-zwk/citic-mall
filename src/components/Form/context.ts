import { createContext } from 'react';
import { FormContextProps } from './typings';
import { FormInstance } from './hooks/useForm';

const nullFunc: any = () => {};

export const FieldContext = createContext<FormInstance>({
  getFieldValue: nullFunc,
  getFieldsValue: nullFunc,
  setFieldValue: nullFunc,
  setFieldsValue: nullFunc,
  getInternalHooks: nullFunc,
});

export const FormContext = createContext<FormContextProps>({
  layout: 'vertical',
});
