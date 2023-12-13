import { Children, PropsWithChildren, isValidElement, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, ViewStyle, StyleProp } from 'react-native';
import { useControllableValue } from '@/hooks';
import TabItem, { TabItemProps } from './Item';
import Typography from '../Typography';
import { isTrue } from '@/utils/type';

interface TabsProps {
  bodyStyle?: StyleProp<ViewStyle>;
  activeKey?: number | string;
  onChange?: (activeKey: any) => void;
}

const Tabs = (props: PropsWithChildren<TabsProps>) => {
  const { bodyStyle, children } = props;
  const activeIndexRef = useRef(0);
  const tabs = useMemo<SideBar[]>(() => {
    const childrens = Children.toArray(children);
    if (childrens.length) {
      return childrens.map((child, index) => {
        if (isValidElement<TabItemProps>(child)) {
          const { props, key } = child;
          const { value } = props;
          return {
            key: value || key || index,
            ...props
          }
        }
        return null;
      }).filter((tab): tab is SideBar => !!tab);
    }

    return [];
  }, [children]);

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

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <ScrollView horizontal>
          {tabs.map(({ key, title }) => {
            const isCurrent = activeKey === key;
            return (
              <TouchableWithoutFeedback onPress={() => setActiveKey(key)} key={key}>
                <View style={styles.tab}>
                  <Typography.Text size="small" primary={isCurrent} strong={isCurrent}>{title}</Typography.Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </ScrollView>
      </View>
      <View style={[styles.main, bodyStyle]}>
        {tabs.map(({ key, children }) => (
          <View style={[styles.content, isTrue(key === activeKey, styles.show)]} key={key}>{children}</View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabs: {
    paddingLeft: 20,
    backgroundColor: '#fff'
  },
  tab: {
    marginRight: 20,
    paddingVertical: 14,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'none',
  },
  show: {
    display: 'flex'
  }
});

Tabs.Item = TabItem;

export default Tabs;
