import { Children, PropsWithChildren, ReactElement, isValidElement, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import SideBarItem, { SearchBarProps } from './Item';
import { useControllableValue } from '@/hooks';
import { isTrue } from '@/utils/type';

interface SideBarProps {
  
}

const SideBar = ({ children, ...restProps }: PropsWithChildren<SideBarProps>) => {
  const activeIndexRef = useRef(0);
  const tabs = useMemo<SideBar[]>(() => {
    const childrens = Children.toArray(children);
    if (childrens.length) {
      return childrens.map((child, index) => {
        if (isValidElement(child)) {
          const { props, key } = child as ReactElement<SearchBarProps>;
          return {
            key: key || index,
            ...props,
          }
        }
        return null;
      }).filter((tab): tab is SideBar => !!tab);
    }

    return [];
  }, [children]);

  const [activeKey, setActiveKey] = useControllableValue(restProps, {
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

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <ScrollView>
          {tabs.map(({ key, title }) => {
            const isCurrent = activeKey === key;

            return (
              <TouchableOpacity onPress={() => setActiveKey(key)}  key={key}>
                <View style={[styles.sideItem, isTrue(isCurrent, styles.sideAtiveItem)]}>
                  <Text style={[styles.sideItemTitle, isTrue(isCurrent, styles.sideAtiveItemTitle)]}>{title}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.main}>
        {tabs.map(({ key, children }) => (
          <View style={[styles.content, isTrue(activeKey !== key, styles.hidden)]} key={key}>{children}</View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  side: {
    width: 80,
    backgroundColor: '#f5f6fa',
  },
  main: {
    flex: 1
  },
  sideItem: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideItemTitle: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  sideAtiveItem: {
    backgroundColor: '#fff'
  },
  sideAtiveItemTitle: {
    color: '#e65321',
    fontWeight: '500'
  },
  content: {
    height: '100%'
  },
  hidden: {
    display: 'none'
  }
});

SideBar.Item = SideBarItem;

export default SideBar;
