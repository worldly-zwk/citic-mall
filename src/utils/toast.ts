import { Dimensions } from 'react-native';
import Toast, { ToastOptions } from 'react-native-root-toast';

let windowHeight = Dimensions.get('window').height;

function toast(message: string, options?: ToastOptions) {
  const instance = Toast.show(message, {
    shadow: false,
    position: -(windowHeight / 2),
    duration: Toast.durations.LONG,
    ...options,
  });
  return instance.destroy;
}

export default toast;
