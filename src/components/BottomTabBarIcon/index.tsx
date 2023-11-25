import { FC, useMemo } from "react";
import { Image, ImageSourcePropType } from "react-native";

interface BottomTabBarProps {
  name: string;
  focused: boolean;
  color: string;
  size: number;
}

interface TabBarConfig {
  [key: string]: {
    source: ImageSourcePropType,
    activeSource: ImageSourcePropType,
  }
}

const tabBarConfig: TabBarConfig = {
  Home: {
    source: require('@/assets/images/tab_bar/home.png'),
    activeSource: require('@/assets/images/tab_bar/home_active.png'),
  },
  Category: {
    source: require('@/assets/images/tab_bar/category.png'),
    activeSource: require('@/assets/images/tab_bar/category_active.png'),
  },
  Cart: {
    source: require('@/assets/images/tab_bar/cart.png'),
    activeSource: require('@/assets/images/tab_bar/cart_active.png'),
  },
  Member: {
    source: require('@/assets/images/tab_bar/member.png'),
    activeSource: require('@/assets/images/tab_bar/member_active.png'),
  }
};

const BottomTabBarIcon: FC<BottomTabBarProps> = ({ name, focused }) => {
  const source = useMemo(() => {
    const info = tabBarConfig[name];

    if (focused) {
      return info.activeSource;
    }

    return info.source;
  }, [focused]);


  return (
    <Image source={source} style={{ width: 30, height: 30 }} />
  )
}

export default BottomTabBarIcon;
