import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@/typings';

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

export default new Proxy({} as NavigationContainerRef<RootStackParamList>, {
  get(target, prop, receiver) {
    if (navigationRef.current) {
      return Reflect.get(navigationRef.current, prop);
    }
  }
});
