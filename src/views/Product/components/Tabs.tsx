import { FC, Key, useRef } from 'react';
import { Animated, LayoutRectangle, StyleSheet, View } from 'react-native';
import { Link, Typography } from '@/components';
import { useControllableValue, useLinePosition, useUpdate } from '@/hooks';
import { isTrue } from '@/utils';

const tabs = [
  {
    label: '商品',
    value: 'main'
  },
  {
    label: '评价',
    value: 'comment'
  },
  {
    label: '详情',
    value: 'intro'
  },
];

interface ProductTabsProps {
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (value: string) => void;
}

const Tabs: FC<ProductTabsProps> = (props) => {
  const update = useUpdate();
  const tabSizesRef = useRef(new Map<Key, LayoutRectangle>());
  const [activeKey, setActiveKey] = useControllableValue(props, {
    defaultValue: 'main',
    defaultValuePropName: 'defaultActiveKey'
  });
  
  const lineStyle = useLinePosition({
    activeKey,
    tabSizes: tabSizesRef.current
  });

  return (
    <View style={styles.container}>
      {tabs.map(({ label, value }) => (
        <Link
          key={value}
          style={styles.tab}
          onPress={() =>{
            setActiveKey(value);
          }}
          onLayout={(e) => {
            tabSizesRef.current.set(value, e.nativeEvent.layout);
            update();
          }}
        >
          <Typography.Text size={15} style={isTrue(value === activeKey, styles.active)}>{label}</Typography.Text>
        </Link>
      ))}
      <Animated.View style={[styles.line, lineStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    width: 68,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 14,
    height: 2,
    backgroundColor: '#e65321',
    borderRadius: 1,
  },
  active: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  }
})

export default Tabs;
