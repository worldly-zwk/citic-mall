import { FC, Key, PropsWithChildren, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface TabItemProps {
  key: Key;
  title: string;
  value: Key;
  style?: ViewStyle;
  forceRender?: boolean;
  children?: ReactNode;
}

const TabItem: FC<PropsWithChildren<TabItemProps>> = () => null;

export default TabItem;
