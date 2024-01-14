import RootSiblingsManager from 'react-native-root-siblings';
import Alert, { AlertProps } from './Alert';
import ActionSheet, { ActionSheetProps } from './ActionSheet';
import Confirm, { ConfirmProps } from './Confirm';

export default {
  alert: (options: AlertProps) => {
    const originOk = options?.onOk;
    const rootSibling = new RootSiblingsManager(
      <Alert
        {...options}
        onOk={() => {
          setTimeout(() => {
            originOk?.();
            rootSibling.destroy();
          }, 200)
        }}
      />
    );
  },
  confirm: (options: ConfirmProps) => {
    const originOk = options?.onOk;
    const originCancel = options?.onCancel;
    const rootSibling = new RootSiblingsManager(
      <Confirm
        {...options}
        onOk={() => {
          setTimeout(() => {
            originOk?.();
            rootSibling.destroy();
          }, 200)
        }}
        onCancel={() => {
          setTimeout(() => {
            originCancel?.();
            rootSibling.destroy();
          }, 200)
        }}
      />
    );
  },
  actionSheet: (options: ActionSheetProps, callback?: ActionSheetProps['onOk']) => {
    const originCancel = options?.onCancel;
    const rootSibling = new RootSiblingsManager(
      <ActionSheet
        {...options}
        onOk={callback}
        onCancel={() => {
          setTimeout(() => {
            originCancel?.();
            rootSibling.destroy();
          }, 200)
        }}
      />
    );
  }
};