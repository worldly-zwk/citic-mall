import { useCallback } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import GlobalBack from '@/components/GlobalBack';
import ProductTitle from '@/components/ProductTitle';
import { RootStackParamList } from '@/typings/screen';
import Product from '@/views/Product';
import CategoryTabs from '@/views/CategoryTabs';
import Search from '@/views/Search';
import SearchList from '@/views/SearchList';
import Settings from '@/views/Settings';
import Order from '@/views/Order';
import Address from '@/views/Address';
import AddressForm from '@/views/AddressForm';
import HomeScreen from './Home';
import LoginScreen from './Login';


const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const NavigatorScreen = () => {
  const screenOptions = useCallback((): NativeStackNavigationOptions => {

    return {
      headerLeft: () => <GlobalBack />,
      headerBackTitleVisible: false,
      contentStyle: {
        backgroundColor: '#f5f6fa'
      }
    }
  }, []);

  const screenProductOptions = useCallback((props: ScreenChildrenProps): NativeStackNavigationOptions => {
  
      return {
        headerTitle: () => <ProductTitle {...props} />,
      }
    }, []);

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Index" component={HomeScreen} options={{ headerShown: false }} />
      <Screen name="Product" component={Product} options={screenProductOptions} />
      <Screen name="CategoryTabs" component={CategoryTabs} options={{ title: '' }} />
      <Screen name="Search" component={Search} options={{ headerShown: false }} />
      <Screen name="SearchList" component={SearchList} options={{ headerShown: false }} />
      <Screen name="Login" component={LoginScreen} options={{ presentation: 'transparentModal', headerShown: false }} />
      <Screen name="Settings" component={Settings} options={{ title: '设置' }} />
      <Screen name="Order" component={Order} options={{ title: '提交订单' }} />
      <Screen name="Address" component={Address} options={{ title: '地址管理' }} />
      <Screen name="AddressForm" component={AddressForm} options={{ title: '新增收获地址' }} />
    </Navigator>
  )
}

export default NavigatorScreen;
