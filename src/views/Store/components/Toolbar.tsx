import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Link, Space, Typography } from '@/components';

const Toolbar = () => {
  const insets = useSafeAreaInsets();
  return (
    <Space style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
      <Link style={[styles.item, styles.bordered]}>
        <Icon icon="store" size={24} />
        <Typography.Text size="small">店铺信息</Typography.Text>
      </Link>
      <Link style={[styles.item, styles.bordered]}>
        <Icon icon="category" size={24} />
        <Typography.Text size="small">全部分类</Typography.Text>
      </Link>
      <Link style={styles.item}>
        <Icon icon="customerServiceGray" size={24} />
        <Typography.Text size="small">联系客服</Typography.Text>
      </Link>
    </Space>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    columnGap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bordered: {
    borderRightColor: '#f5f6fa',
    borderRightWidth: 1,
  }
})

export default Toolbar;
