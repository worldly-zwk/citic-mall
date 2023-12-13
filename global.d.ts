type RecordAny<T = any> = Record<string | number, T>;

interface ScreenChildrenProps {
  route: RouteProp;
  navigation: NavigationProp;
}
