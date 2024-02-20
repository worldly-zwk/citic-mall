import { PropsWithChildren } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useTabs } from '@/hooks';
import { isTrue } from '@/utils/type';
import Typography from '../Typography';
import SideBarItem from './Item';

interface SideBarProps { }

const SideBar = (props: PropsWithChildren<SideBarProps>) => {
  const { tabs, activeKey, setActiveKey } = useTabs(props);

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <ScrollView>
          {tabs.map(({ key, title }) => {
            const isCurrent = activeKey === key;
            return (
              <TouchableOpacity onPress={() => setActiveKey(key)}  key={key}>
                <View style={[styles.sideItem, isTrue(isCurrent, styles.sideAtiveItem)]}>
                  <Typography.Text size="small" style={[styles.sideItemTitle, isTrue(isCurrent, styles.sideAtiveItemTitle)]}>{title}</Typography.Text>
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
