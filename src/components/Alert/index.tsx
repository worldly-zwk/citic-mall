import RootSiblingsManager from 'react-native-root-siblings';
import Alert, { AlertProps } from './Alert';

export default {
  alert: (options: AlertProps) => {
    const originOk = options?.onOk;
    console.log(options);
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
  }
};