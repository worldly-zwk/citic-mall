import { StyleSheet, View, Image, ViewProps } from 'react-native';
import Space from '../Space';
import Typography from '../Typography';
import Icon from '../Icon';

const { Text } = Typography;

interface ProductSummaryInlineProps extends ViewProps {
  data?: API.OrderProduct;
  showIcon?: boolean; 
}

const ProductSummaryInline = ({ data, style, showIcon, ...restProps }: ProductSummaryInlineProps) => {
  return (
    <Space style={[styles.container, style]} size={8} {...restProps}>
      <Image style={styles.image} source={{ uri: data?.productMasterImage }} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1}>{data?.productName}</Text>
        <Text size="small" color="disabled" style={styles.norms}>{data?.specInfo || '默认规格'}</Text>
        <Space align="center" justify="space-between">
          <Text size="large" primary>¥{data?.moneyPrice}</Text>
          <Text size="small" color="secondary">x{data?.number}</Text>
        </Space>
        {data?.isSevenBack === 0 && (
          <Space size={6} align="center">
            {showIcon && <Icon icon="warning" />}
            <Text size="small" color="#f5a623">该商品不支持7天无理由退货</Text>
          </Space>
        )}
      </View>
    </Space>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: 70,
    height: 70,
  },
  norms: {
    marginBottom: 14
  }
})

export default ProductSummaryInline;
