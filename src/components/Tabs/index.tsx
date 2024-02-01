import { Children, Key, PropsWithChildren, isValidElement, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, ViewStyle, StyleProp, Animated, LayoutRectangle } from 'react-native';
import { useControllableValue, useUpdate } from '@/hooks';
import { TabOptions, TabsItemProps } from '@/typings';
import Typography from '../Typography';
import TabItem from './Item';
import { useLinePosition, useScrollTabToCenter } from './hooks';
import TabPanel from './Panel';

interface TabsProps {
  style?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  activeKey?: number | string;
  activeLine?: boolean;
  defaultActiveKey?: number | string;
  scrollable?: boolean;
  onChange?: (activeKey: any) => void;
}

const Tabs = (props: PropsWithChildren<TabsProps>) => {
  const { style, bodyStyle, children, scrollable = true, activeLine = true } = props;
  const update = useUpdate();
  const scrollRef = useRef<ScrollView>(null);
  const tabSizesRef = useRef(new Map<Key, LayoutRectangle>());
  const activeIndexRef = useRef(0);
  
  const tabs = useMemo<TabOptions[]>(() => {
    const childrens = Children.toArray(children);
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
  }, [children]);

  const [activeKey, setActiveKey] = useControllableValue(props, {
    valuePropName: 'activeKey',
    defaultValuePropName: 'defaultActiveKey',
  });

  const allKey = tabs.map(({ key }) => key).join('-');

  const lineStyle = useLinePosition({
    activeKey,
    tabSizes: tabSizesRef.current,
  });

  const handleScroll = useScrollTabToCenter({
    activeKey,
    scrollable,
    tabSizes: tabSizesRef.current,
    scrollView: scrollRef,
  })

  const renderTabs = () => {
    const children = tabs.map(({ key, title }) => {
      const isCurrent = activeKey === key;
      return (
        <TouchableWithoutFeedback onPress={() => setActiveKey(key)} key={key}>
          <View
            style={styles.tab}
            onLayout={(e) => {
              tabSizesRef.current.set(key, e.nativeEvent.layout);
              update();
            }}
          >
            <Typography.Text size="small" primary={isCurrent} strong={isCurrent}>{title}</Typography.Text>
          </View>
        </TouchableWithoutFeedback>
      )
    });

    if (scrollable) {
      return (
        <ScrollView
          horizontal
          ref={scrollRef}
          onScroll={handleScroll}
          scrollEventThrottle={300}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {children}
        </ScrollView>
      )
    }

    return (
      <View style={styles.wrapper}>
        {children}
        {activeLine && <Animated.View style={[styles.line, lineStyle]}></Animated.View>}
      </View>
    );
  };

  useEffect(() => {
    if (!props.hasOwnProperty('activeKey')) {
      let newActiveIndex = tabs.findIndex(({ key }) => key === activeKey);
      if (newActiveIndex === -1) {
        newActiveIndex = Math.max(0, Math.min(activeIndexRef.current, tabs.length - 1));
        setActiveKey(tabs[newActiveIndex]?.key);
      }
      activeIndexRef.current = newActiveIndex;
    }
  }, [allKey, activeKey]);

  return (
    <View style={style}>
      <View style={styles.tabs}>
        {renderTabs()}
      </View>
      <View style={[styles.main, bodyStyle]}>
        {tabs.map(({ key, children, style, forceRender = false }) => (
          <TabPanel visible={key === activeKey} style={[styles.content, style]} forceRender={forceRender} key={key}>{children}</TabPanel>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#fff',
    elevation: 4,
    zIndex: 1,
  },
  wrapper: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  line: {
    position: 'absolute',
    width: 14,
    height: 2,
    backgroundColor: '#e65321',
    borderRadius: 2,
    bottom: 0,
    left: 0,
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
