import { Key, PropsWithChildren, useRef } from 'react';
import { Animated, LayoutRectangle, StyleSheet, View } from 'react-native';
import { useControllableValue, useLinePosition, useUpdate } from '@/hooks';
import Typography from '../Typography';
import Link from '../Link';
import Icon from '../Icon';

export interface SortOption {
  label: string;
  value: Key | [Key, Key];
}

interface SortBarProps {
  options: SortOption[];
  value?: Key;
  onChange?: (value: Key) => void;
}

const SortBar = (props: PropsWithChildren<SortBarProps>) => {
  const { options } = props;
  const defaultValue = options[0]?.value;
  const update = useUpdate();
  const tabSizesRef = useRef(new Map<Key, LayoutRectangle>());

  const [activeKey, setActiveKey] = useControllableValue(props, {
    defaultValue: Array.isArray(defaultValue) ? defaultValue[0] : defaultValue,
  });

  const lineStyle = useLinePosition({
    activeKey,
    tabSizes: tabSizesRef.current
  });

  return (
    <View style={styles.container}>
      {options.map(({ label, value }) => {
        const isArray = Array.isArray(value);
        const isActive = isArray ? value.includes(activeKey) : value === activeKey;
        const isAscend = isArray && value[0] === activeKey;

        return (
          <Link
            key={`${value}`}
            style={styles.sorter}
            onLayout={(e) => {
              if (isArray) {
                value.forEach((key) => {
                  tabSizesRef.current.set(key, e.nativeEvent.layout);
                })
              } else {
                tabSizesRef.current.set(value, e.nativeEvent.layout);
              }
              update();
            }}
            onPress={() => {
              if (isArray) {
                if (isActive) {
                  const index = value.indexOf(activeKey) + 1;
                  setActiveKey(value[index % value.length]);
                } else {
                  setActiveKey(value[0]);
                }
              } else {
                setActiveKey(value);
              }
            }}
          >
            <Typography.Text color={isActive ? 'primary' : '#888'} size="small" strong={isActive}>{label}</Typography.Text>
            {Array.isArray(value) && (
              <Icon size={10} icon={isActive ? (isAscend ? 'sorterAsc' : 'sorterDesc') : 'sorter'} />
            )}
          </Link>
        )
      })}
      <Animated.View style={[styles.line, lineStyle]}></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
  },
  sorter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 2,
  },
  line: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    width: 14,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#e65321'
  }
});

export default SortBar;
