import { StyleSheet, View, Image } from 'react-native';
import { Icon, Link, Space, Tag, Typography } from '@/components';
import { useOrder } from '@/store';


const AddressCard = () => {
  const address = useOrder(state => state.order?.addressVO);

  if (address) {
    const isDefault = address.state === 1;

    return (
      <Link style={styles.container} to={{ screen: 'Address', params: { source: 'Order' } }}>
        <Space size={12} align="center">
          <View style={styles.address}>
            <Space size={12} align="center">
              <Typography.Text size="large">{address.memberName}</Typography.Text>
              <Typography.Text size="large">{address.mobile}</Typography.Text>
            </Space>
            <Typography tag={isDefault ? <Tag color="#e65321">默认</Tag> : null}>
              <Typography.Text color="secondary" indent={isDefault ? 5 : 0}>{address.addAll} {address.addressInfo}</Typography.Text>
            </Typography>
          </View>
          <Icon icon="arrow" />
        </Space>
        <Image style={styles.borderd} source={require('@/assets/images/view/ribbon.png')} />
      </Link>
    )
  }

  return (
    <Link style={styles.container} to={{ screen: 'Address', params: { source: 'Order' } }}>
      <Space style={styles.empty} align="center">
        <Typography.Text size="large">新增收货地址</Typography.Text>
        <Icon icon="arrow" />
      </Space>
      <Image style={styles.borderd} source={require('@/assets/images/view/ribbon.png')} />
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    overflow: 'hidden',
    paddingBottom: 15,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  empty: {
    justifyContent: 'space-between',
  },
  address: {
    flex: 1,
  },
  borderd: {
    position: 'absolute',
    height: 3,
    right: 0,
    bottom: 0,
    left: 0,
  }
})

export default AddressCard;
