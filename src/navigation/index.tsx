import { useCallback } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/typings/screen';
import Product from '@/views/Product';
import TabNavigator from './TabNavigator';
import ProductTitle from '@/components/ProductTitle';
import { Text } from 'react-native';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const NavigatorScreen = () => {
  const screenOptions = useCallback(({ route }: ScreenChildrenProps): NativeStackNavigationOptions => {

    return {
      // headerShown: false,
    }
  }, []);

  const screenProductOptions = useCallback((props: ScreenChildrenProps): NativeStackNavigationOptions => {
  
      return {
        headerTitle: () => <ProductTitle {...props} />,
      }
    }, []);

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Index" component={TabNavigator} options={{ headerShown: false }} />
      <Screen name="Product" component={Product} options={screenProductOptions} />
    </Navigator>
  )
}

export default NavigatorScreen;
