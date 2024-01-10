import { useCallback, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Card, Empty, Icon, Link, Spin, VisitedProductItem } from '@/components';
import { MEMBER } from '@/services';
import { useRequest } from '@/hooks';
import { isTrue, request } from '@/utils';
import { HistoryScreenProps } from '@/typings';

interface HistorySection {
  title: string;
  items: Omit<API.CollectionProduct, "id">[];
}

const History = ({ navigation }: HistoryScreenProps) => {
  const insets = useSafeAreaInsets();
  const [state] = useRequest<API.History>(MEMBER.logs);

  const sections = useMemo(() => {
    const items: HistorySection[] = [];
    if (state.data) {
      const { today, todayList, yesterday, yesterdayList, earlierList } = state.data;
      if (todayList.length) {
        items.push({
          title: today,
          items: todayList,
        });
      }

      if (yesterdayList.length) {
        items.push({
          title: yesterday,
          items: yesterdayList,
        });
      }

      if (earlierList.length) {
        items.push({
          title: '更早',
          items: earlierList,
        });
      }
    }
    return items;
  }, [state.data]);

  const handleClean = useCallback(() => {
    Alert.confirm({
      message: '您要清空浏览记录吗？',
      okText: '清空',
      onOk() {
        request.delete(MEMBER.logs);
      },
    });
  }, []);

  useEffect(() => {
    if (sections.length) {
      navigation.setOptions({
        headerRight() {
          return (
            <Link onPress={handleClean}>
              <Icon size={24} icon="deleteOutlined" />
            </Link>
          )
        }
      });
    }
  }, [handleClean, sections]);

  if (!sections.length) {
    return (
      <Spin spinning={state.loading}>
        <Empty
          style={styles.empty}
          image={require('@/assets/images/empty/history.png')}
          title="暂无浏览记录哦"
        />
      </Spin>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ rowGap: 12, padding: 12, paddingBottom: insets.bottom }}>
        {sections.map(({ title, items }, index) => {
          return (
            <Card title={title} key={index}>
              {items.map(item => (
                <VisitedProductItem data={item} style={[styles.item, isTrue(index < items.length - 1, styles.bordered)]} key={item.productId} />
              ))}
            </Card>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    margin: 10,
    borderRadius: 6,
    paddingTop: 30,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  section: {
    backgroundColor: '#fff',
  },
  item: {
    paddingHorizontal: 0,
  },
  bordered: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default History;
