import { useRef } from 'react';
import { FieldEntity, ReducerAction, WatchCallBack } from '../typings';
import { cloneByNamePathList, getValue, setValue } from '../utils';

export type FormInstance = ReturnType<FormStore['getForm']>;

export class FormStore {
  private store: RecordAny = {};

  private initialValues: RecordAny = {};

  private fieldEntities: FieldEntity[] =[];

  public getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      setFieldsValue: this.setFieldsValue,
      getInternalHooks: this.getInternalHooks,
    }
  }

  private getInternalHooks = () => {
    return {
      dispatch: this.dispatch,
      registerField: this.registerField,
      registerWatch: this.registerWatch,
      setInitialValues: this.setInitialValues
    }
  }

  private setInitialValues = (initialValues: RecordAny, init: boolean) => {
    this.initialValues = initialValues || {};
    if (init) {
      const nextStore = Object.assign(initialValues, this.store);
      this.updateStore(nextStore);
    }
  }

  private getFieldValue = (namePath: string) => {
    return getValue(this.store, namePath);
  }

  private getFieldsValue = (nameList?: string[] | true) => {
    if (nameList === true) {
      return this.store;
    }

    let filteredNameList = nameList || [];

    if (!Array.isArray(nameList)) {
      filteredNameList = this.getFieldEntities(true).map(field => field.getNamePath() as string);
    }

    return cloneByNamePathList(this.store, filteredNameList);
  }

  private setFieldsValue = (store: RecordAny) => {
    
  }

  private setFieldValue = (namePath: string, value: any) => {
    this.updateStore(setValue(this.store, namePath, value));
  }

  private registerField = (entity: FieldEntity) => {
    this.fieldEntities.push(entity);
    const namePath = entity.getNamePath() || '';
    this.notifyWatch(namePath);

    return () => {
      this.fieldEntities = this.fieldEntities.filter(field => field !== entity);
    }
  }

  private watchList: WatchCallBack[] = [];

  private registerWatch = (callback: WatchCallBack) => {
    this.watchList.push(callback);

    return () => {
      this.watchList = this.watchList.filter(fn => fn !== callback);
    }
  }

  private notifyWatch = (namePath: string) => {
    if (this.watchList.length) {
      const values = this.getFieldsValue();
      const allValues = this.getFieldsValue(true);

      this.watchList.forEach(callback => {
        callback(values, allValues, namePath);
      });
    }
  };

  private getFieldEntities = (pure: boolean = false) => {
    if (!pure) {
      return this.fieldEntities;
    }
    return this.fieldEntities.filter(field => field.getNamePath()?.length);
  }

  private updateStore = (nextStore: RecordAny) => {
    this.store = nextStore;
  }

  private dispatch = (action: ReducerAction) => {
    if (action.type === 'updataValue') {
      const { namePath, value } = action;
      this.updateValue(namePath, value);
      this.notifyObservers();
    }
  }

  private notifyObservers = () => {
    this.fieldEntities.forEach(({ onStoreChange }) => {
      onStoreChange();
    });
  }

  private updateValue = (namePath: string, value: any) => {
    this.store = setValue(this.store, namePath, value);
    this.notifyWatch(namePath);
  }
}

export default function useForm(form?: FormInstance) {
  const formRef = useRef<FormInstance>();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return formRef.current;
}