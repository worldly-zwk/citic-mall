import { createContext } from 'react';
import { FormContextProps, FormInstance } from './typings';

export interface FormStore<T extends RecordAny = RecordAny> extends FormInstance<T> {
  store: T;
}

const nullFunc: any = () => {};

export const FieldContext = createContext<FormStore>({
  store: {},
  getValue: nullFunc,
  setValue: nullFunc,
  getValues: nullFunc,
  setValues: nullFunc,
});

export const FormContext = createContext<FormContextProps>({
  layout: 'vertical',
});
