import { useCallback } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { LoginStackParamList } from '@/typings/screen';
import GlobalBack from '@/components/GlobalBack';
import Login from '@/views/Login';
import SMSCode from '@/views/SMSCode';

const { Navigator, Screen } = createNativeStackNavigator<LoginStackParamList>();

const LoginScreen = () => {
  const screenOptions = useCallback(({ route }: ScreenChildrenProps): NativeStackNavigationOptions => {
    return {
      headerLeft: () => <GlobalBack />,
      headerBackTitleVisible: false,
    }
  }, []);

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Index" component={Login} options={{ headerShown: false }} />
      <Screen name="SMSCode" component={SMSCode} options={{ title: '' }} />
    </Navigator>
  )
}

export default LoginScreen;
