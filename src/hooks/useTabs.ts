import { Children, ReactNode, isValidElement, useEffect, useMemo, useRef } from 'react';
import { TabOptions, TabsItemProps } from '@/typings';
import useControllableValue from './useControllableValue';

interface TabsProps {
  activeKey?: any;
  onChange?: any;
  children?: ReactNode;
}

function useTabs(props: TabsProps) {
  const activeIndexRef = useRef(0);
  const tabs = useMemo<TabOptions[]>(() => {
    const childrens = Children.toArray(props.children);
    if (childrens.length) {
      return childrens.map((child, index) => {
        if (isValidElement<TabsItemProps>(child)) {
          const { props, key } = child;
          const { value } = props;
          return {
            ...props,
            key: value || key || index,
          }
        }
        return null;
      }).filter((tab): tab is TabOptions => !!tab);
    }

    return [];
  }, [props.children]);

  const [activeKey, setActiveKey] = useControllableValue(props, {
    defaultValue: tabs[0]?.key,
    valuePropName: 'activeKey'
  });

  useEffect(() => {
    let newActiveIndex = tabs.findIndex(({ key }) => key === activeKey);
    if (newActiveIndex === -1) {
      newActiveIndex = Math.max(0, Math.min(activeIndexRef.current, tabs.length - 1));
      setActiveKey(tabs[newActiveIndex]?.key);
    }
    activeIndexRef.current = newActiveIndex;
  }, [tabs.map(({ key }) => key).join('-'), activeKey]);

  return { tabs, activeKey, setActiveKey };
}

export default useTabs;
