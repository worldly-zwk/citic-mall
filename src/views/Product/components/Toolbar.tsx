import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton } from '@/components';
import { AddCartMode } from '@/typings';

interface ToolbarProps {
  data?: API.ProductInfo;
  collection?: boolean;
  onCollection?: (collection: boolean) => void;
  onSubmit?: (mode: AddCartMode) => void;
}

const Toolbar: FC<ToolbarProps> = ({ data, collection, onCollection, onSubmit }) => {
  const collectionIcon = collection ? require('@/assets/images/icons/bookmark-active.png') : require('@/assets/images/icons/bookmark.png');

  const handleCollection = useCallback(() => {
    onCollection?.(!collection);
  }, [collection]);

  const renderButton = () => {
    if (data?.state === 7 || data?.productStock === 0) {
      return (
        <Button.Group>
          <Button disabled textStyle={{ fontSize: 14 }}>{data.state === 7 ? '已下架' : '已售罄'}</Button>
        </Button.Group>
      )
    }

    return (
      <Button.Group>
        <Button onPress={() => onSubmit?.(AddCartMode.ADD)}>加入购物车</Button>
        <Button onPress={() => onSubmit?.(AddCartMode.BUY)} linearGradient={{ colors: ['#ff680d', '#e65321'] }}>立即购买</Button>
      </Button.Group>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <IconButton style={styles.borderd} icon={require('@/assets/images/icons/cart.png')} to={{ screen: 'Cart' }}>购物车</IconButton>
        <IconButton style={styles.borderd} icon={require('@/assets/images/icons/help-hands.png')}>客服</IconButton>
        <IconButton icon={collectionIcon} color={collection ? 'primary' : 'secondary'} onPress={handleCollection}>{collection ? '已收藏' : '收藏'}</IconButton>
      </View>
      {renderButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 49,
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row'
  },
  borderd: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#eee',
  },
})

export default Toolbar;
