import { StyleSheet, View } from 'react-native';
import { Space, Typography, Checkbox, Tag, Link, Icon, LinkProps } from '@/components';

const { Text } = Typography;

interface AddressCardProps extends LinkProps {
  data: API.MemberAuth;
  source?: 'Order';
  checked?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  onCheckedChange?: (checked: boolean) => void;
}

const RealNameCard = ({ data, source, checked, onDelete, onCheckedChange, ...restProps }: AddressCardProps) => {
  return (
    <Link style={styles.container} {...restProps}>
      <View style={styles.content}>
        <Typography.Text size="large">{data.idCardName}</Typography.Text>
        <Typography.Text color="secondary">{data.idCardNo}</Typography.Text>
      </View>
      <Space style={styles.actions}>
        <Checkbox checked={checked}>
          <Typography.Text color="secondary">默认实名人</Typography.Text>
        </Checkbox>
        <Link style={styles.action} onPress={onDelete}>
          <Icon icon="delete" />
          <Text color="secondary">删除</Text>
        </Link>
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
  content: {
    rowGap: 2,
    paddingBottom: 12,
  },
  actions: {
    height: 44,
    justifyContent: 'space-between',
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  action: {
    columnGap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export default RealNameCard;
   