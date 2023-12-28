import { StyleSheet, View } from 'react-native';
import { Space, Typography, Checkbox, Tag, Link, Icon, LinkProps } from '@/components';

const { Text } = Typography;

interface AddressCardProps extends LinkProps {
  data: API.Address;
  source?: 'Order';
  checked?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  onCheckedChange?: (checked: boolean) => void;
}

const AddressCard = ({ data, source, checked, onDelete, onCheckedChange, ...restProps }: AddressCardProps) => {
  return (
    <Link style={styles.container} {...restProps}>
      <View style={styles.content}>
        <Space size={8} align="center">
          <Text size="large">{data.memberName}</Text>
          <Text size="large">{data.mobile}</Text>
          {checked && <Tag color="#e65321">默认</Tag>}
        </Space>
        <Text color="secondary" style={styles.address}>{data.addAll} {data.addressInfo}</Text>
      </View>
      <Space align="center" justify="space-between" style={styles.actions}>
        <Checkbox checked={checked} onChange={onCheckedChange}>
          <Text color="secondary">默认收货地址</Text>
        </Checkbox>
        <Space align="center" size={20}>
          <Link style={styles.action} to={{ screen: 'AddressForm', params: { id: data.id, address: data, source } }}>
            <Icon icon="edit" />
            <Text color="secondary">编辑</Text>
          </Link>
          <Link style={styles.action} onPress={onDelete}>
            <Icon icon="delete" />
            <Text color="secondary">删除</Text>
          </Link>
        </Space>
      </Space>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 0,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  content: {},
  actions: {
    height: 44,
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  address: {
    marginTop: 8,
    marginBottom: 12,
  },
  action: {
    columnGap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default AddressCard;
   