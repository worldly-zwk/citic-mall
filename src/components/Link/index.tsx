import { useCallback } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedback, View, ViewProps } from 'react-native';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/typings/screen';

interface LinkProps extends ViewProps{
  to?: NavigatorScreenParams<RootStackParamList>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const Link = (props: LinkProps) => {
  const { to, onPress, disabled, ...restProps } = props;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = useCallback((e: GestureResponderEvent) => {
    if (to && !disabled) {
      const { screen, params } = to;
      navigation.navigate(screen as any, params);
    }
    onPress?.(e);
  }, [to, disabled]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View {...restProps} />
    </TouchableWithoutFeedback>
  )
}

export default Link;
