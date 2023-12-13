import { FC, PropsWithChildren } from 'react';

export interface TabItemProps {
  title: string;
  value: any;
}

const TabItem: FC<PropsWithChildren<TabItemProps>> = () => null;

export default TabItem;
