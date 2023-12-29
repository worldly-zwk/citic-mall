import { useCallback } from 'react';
import { BottomTabNavigationOptions, BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBarIcon from '@/components/BottomTabBarIcon';
import { RootTabParamList } from '@/typings/screen';
import Home from '@/views/Home';
import Category from '@/views/Category';
import Cart from '@/views/Cart';
import Member from '@/views/Member';

const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();

const HomeScreen = () => {
  const screenOptions = useCallback(({ route }: BottomTabScreenProps<RootTabParamList>): BottomTabNavigationOptions => {
    return {
      headerShown: false,
      tabBarInactiveTintColor: '#666',
      tabBarActiveTintColor: '#e65321',
      tabBarIcon: props => <BottomTabBarIcon {...props} name={route.name} />
    }
  }, []);

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="Home" component={Home} options={{ tabBarLabel: '首页' }} />
      <Screen name="Category" component={Category} options={{ tabBarLabel: '分类' }} />
      <Screen name="Cart" component={Cart} options={{ headerShown: true, tabBarLabel: '购物车', title: '购物车' }} />
      <Screen name="Member" component={Member} options={{ tabBarLabel: '我的' }} />
    </Navigator>
  )
}

export default HomeScreen;
