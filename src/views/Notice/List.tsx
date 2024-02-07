import { useCallback } from 'react';
import { FlatList, Image, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AutoHeightImage, Card, Link, Space, Spin, Tag, Typography } from '@/components';
import { NoticeScreenProps, NoticeTab, WalletTab } from '@/typings';
import { useRequest } from '@/hooks';
import { HOME } from '@/services';
import { pickText } from '@/utils';

interface NotificationListProps {
  tab: NoticeTab;
  onPress?: (notice: API.Message) => void;
}


const NoticeList = (props: NotificationListProps) => {
  const { tab } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NoticeScreenProps['navigation']>();
  const [state] = useRequest<API.NoticeResponse>(HOME.notice, {
    defaultParams: {
      currentType: tab
    }
  });


  const renderContent = useCallback((item: API.Message) => {
    if (tab === NoticeTab.ACTIVITY) {
      return (
        <View style={{ gap: 12 }}>
          <AutoHeightImage source={{ uri: item.h5Image }} />
          <Typography.Text size="small" numberOfLines={2} style={styles.text}>{pickText(item.content)}</Typography.Text>
        </View>
      )
    }

    if (tab === NoticeTab.SYSTEM) {
      return (
        <Space align="center" size={8}>
          <Image style={styles.icon} source={{ uri: item.image }} />
          <Typography.Text size="small" numberOfLines={2} style={[styles.text, { flex: 1 }]}>{item.content}</Typography.Text>
        </Space>
      )
    }

    if (tab === NoticeTab.PLATFORM) {
      return <Typography.Text size="small" numberOfLines={2} style={styles.text}>{pickText(item.content)}</Typography.Text>
    }

  }, []);

  const renderItem = useCallback((info: ListRenderItemInfo<API.Message>) => {
    const handlePress = () => {
      const { id, msgType, refSn, refId } = info.item;
      if (tab === NoticeTab.SYSTEM) {
        if (msgType === 1) {
          navigation.navigate('OrderDetails', { id: refSn });
        } else if (msgType === 2) {
          navigation.navigate('Wallet', { tab: WalletTab.COUPON });
        }
      } else {
        navigation.navigate('NoticeDetails', { id });
      }
    }

    return (
      <Link style={styles.item} onPress={handlePress}>
        <Tag color="disabled" style={styles.time}>{info.item.timeName}</Tag>
        <Card style={styles.content}>
          <Typography.Text style={styles.title}>{info.item.title}</Typography.Text>
          {renderContent(info.item)}
        </Card>
      </Link>
    )
  }, []);

  if (!state.data) {
    return (
      <Spin spinning={state.loading} />
    )
  }

  return (
    <FlatList
      data={state.data?.msgList}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: insets.bottom + 12 }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
  },
  time: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 10,
  },
  title: {
    lineHeight: 28,
    marginBottom: 12,
  },
  content: {
    width: '100%',
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: '#f5f6fa'
  },
  text: {
    lineHeight: 18,
  }
})

export default NoticeList;
