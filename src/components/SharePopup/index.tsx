import { useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { isWXAppInstalled, shareWebpage } from 'react-native-wechat-lib';
import { useBoolean } from '@/hooks';
import Popup, { PopupProps } from '../Popup';
import Icon from '../Icon';
import Typography from '../Typography';
import Link from '../Link';

interface SharePopupProps extends Omit<PopupProps, 'visible' | 'onClose'> {

}

const SharePopup = (props: SharePopupProps) => {
  const { children } = props;
  const wxInstalledRef = useRef(false);
  const [visible, actions] = useBoolean();

  const handleWXShareSession = useCallback(() => {
    shareWebpage({
      title: '通用锅底 导热快速 超值套组',
      thumbImageUrl: 'https://oss.citic-mall.com/1aa9d6f8-e0c9-4801-a3a4-88a86b40e0ad',
      webpageUrl: 'https://m.citic-mall.com/pages/item/product/index?id=30525',
      description: '通用锅底 导热快速 超值套组',
      scene: 0
    })
  }, []);

  const handleWXShareTimeline = useCallback(() => {
    shareWebpage({
      title: '通用锅底 导热快速 超值套组',
      thumbImageUrl: 'https://oss.citic-mall.com/1aa9d6f8-e0c9-4801-a3a4-88a86b40e0ad',
      webpageUrl: 'https://m.citic-mall.com/pages/item/product/index?id=30525',
      description: '通用锅底 导热快速 超值套组',
      scene: 1
    })
  }, []);

  useEffect(() => {
    isWXAppInstalled().then(installed => {
      wxInstalledRef.current = installed;
    })
  }, []);

  return (
    <>
      {children && (
        <TouchableWithoutFeedback onPress={actions.setTrue}>
          {children}
        </TouchableWithoutFeedback>
      )}
      <Popup visible={visible} onClose={actions.setFalse} bodyStyle={styles.container}>
        <View style={styles.title}>
          <Typography.Text>分享到</Typography.Text>
        </View>
        <ScrollView horizontal contentContainerStyle={{ columnGap: 6 }}>
          <Link style={styles.cell} onPress={handleWXShareSession}>
            <Icon size={48} icon="wechat" />
            <Typography.Text>微信好友</Typography.Text>
          </Link>
          <Link style={styles.cell} onPress={handleWXShareTimeline}>
            <Icon size={48} icon="wechatFriend" />
            <Typography.Text>朋友圈</Typography.Text>
          </Link>
        </ScrollView>
        <Link style={styles.cancel} onPress={actions.setFalse}>
          <Typography.Text size="large">取消</Typography.Text>
        </Link>
      </Popup>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingVertical: 0,
    borderStartStartRadius: 6,
    borderStartEndRadius: 6,
  },
  title: {
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 4,
  },
  cell: {
    width: 68,
    alignItems: 'center',
    rowGap: 12
  },
  cancel: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default SharePopup;
