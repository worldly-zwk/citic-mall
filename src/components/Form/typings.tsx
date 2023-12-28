
export type FormLayout = 'horizontal' | 'vertical';

export interface FormContextProps {
  labelWidth?: number;
  layout?: FormLayout;
  colon?: boolean;
}

export interface FormInstance<T = any> {
  getValues: () => T;
  setValues: (store: Partial<T>) => void;
  getValue: (name: string) => any;
  setValue: (name: string, value: any) => void;
}
