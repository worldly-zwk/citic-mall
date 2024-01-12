
export type FormLayout = 'horizontal' | 'vertical';

export interface FormContextProps {
  labelWidth?: number;
  layout?: FormLayout;
  colon?: boolean;
}

export interface FieldProps extends FormContextProps {
  name?: string;
  value?: any;
  trigger?: string;
  valuePropName?: string;
  onChange?: (...args: any[]) => void;
}

export interface FieldEntity {
  getNamePath: () => string | undefined;
  onStoreChange: () => void;
}

export type ReducerAction = {
  type: 'updataValue';
  namePath: string;
  value: any;
}

export type WatchCallBack = (values: RecordAny, allValues: RecordAny, namePath: string) => void;
