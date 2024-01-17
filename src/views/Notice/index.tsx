import { StyleSheet } from 'react-native';
import { Tabs } from '@/components';
import { NOTIFICATION_TABS } from '@/constants';
import NoticeList from './List';


const Notice = () => {
  return (
    <Tabs style={styles.container} scrollable={false}>
      {NOTIFICATION_TABS.map(({ title, value }) => {
        return (
          <Tabs.Item title={title} value={value} key={value}>
            <NoticeList tab={value} />
          </Tabs.Item>
        )
      })}
    </Tabs>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Notice;
