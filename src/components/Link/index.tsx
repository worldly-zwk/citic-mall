import { useCallback } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedback, View, ViewProps } from 'react-native';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/typings';
import { useMember } from '@/store';

export interface LinkProps extends ViewProps {
  to?: NavigatorScreenParams<RootStackParamList>;
  auth?: boolean;
  push?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const Link = (props: LinkProps) => {
  const { to, auth, push, onPress, disabled, ...restProps } = props;
  const memberLogin = useMember(state => state.login);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigateOrPush = push ? navigation.push : navigation.navigate;

  const handlePress = useCallback((e: GestureResponderEvent) => {
    if (to && !disabled) {
      const { screen, params } = to;
      if (auth && !memberLogin) {
        navigateOrPush('Login', { screen: 'Index' });
      } else if (screen) {
        navigateOrPush(screen, params);
      }
    }
    onPress?.(e);
  }, [to, disabled, onPress, memberLogin, navigateOrPush]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View {...restProps} />
    </TouchableWithoutFeedback>
  )
}

export default Link;
