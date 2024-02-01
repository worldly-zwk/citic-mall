import { StyleSheet, View, ScrollView, ViewProps } from 'react-native';
import { Link, Typography } from '@/components';
import { TabsItemProps } from '@/typings';
import { useTabs } from '@/hooks';
import { isTrue } from '@/utils';

interface TabsProps extends ViewProps {
  activeKey?: any;
}

const Tabs = (props: TabsProps) => {
  const { tabs, activeKey, setActiveKey } = useTabs(props);

  return (
    <View {...props}>
      <ScrollView style={{ height: 50 }} contentContainerStyle={styles.container} horizontal>
        {tabs.map(({ key, title }) => {
          const isCurrent = activeKey === key;
          return (
            <Link
              style={[styles.tab, isTrue(isCurrent, styles.active)]}
              onPress={() => setActiveKey(key)}
              key={key}
            >
              <Typography.Text color={isCurrent ? 'primary' : 'white'}>{title}</Typography.Text>
            </Link>
          )
        })}
      </ScrollView>
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
    height: 50,
    padding: 10,
    columnGap: 10,
  },
  tab: {
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 30,
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#fff',
  },
  main: {
    minHeight: 100,
    backgroundColor: 'green',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  content: {},
  hidden: {
    display: 'none'
  }
});

Tabs.Item = (props: TabsItemProps) => null;

export default Tabs;
