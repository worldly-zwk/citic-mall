import { useCallback } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { LoginStackParamList } from '@/typings/screen';
import GlobalBack from '@/components/GlobalBack';
import Login from '@/views/Login';
import SMSCode from '@/views/SMSCode';

const { Navigator, Screen } = createNativeStackNavigator<LoginStackParamList>();

const LoginScreen = () => {
  const screenOptions = useCallback((): NativeStackNavigationOptions => {
    return {
      headerLeft: () => <GlobalBack />,
      headerBackTitleVisible: false,
    }
  }, []);

  return (
    <RootSiblingParent>
      <Navigator screenOptions={screenOptions}>
        <Screen name="Index" component={Login} options={{ headerShown: false }} />
        <Screen name="SMSCode" component={SMSCode} options={{ title: '' }} />
      </Navigator>
    </RootSiblingParent>
  )
}

export default LoginScreen;
