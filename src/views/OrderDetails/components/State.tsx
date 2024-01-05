import { ImageBackground, StyleSheet } from 'react-native';
import { Icon, Space, Typography } from '@/components';

interface OrderStateProps {
  title?: string;
  describe?: string;
}


const OrderState = ({ title, describe }: OrderStateProps) => {
  return (
    <ImageBackground source={require('@/assets/images/view/order_mask.png')} style={styles.container}>
      <Space size={12} align="center">
        <Icon icon="exclamation" />
        <Typography.Text size="large" color="white" strong>{title}</Typography.Text>
      </Space>
      <Typography.Text style={styles.desc} size="small" color="white">{describe}</Typography.Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 122,
    paddingTop: 20,
    paddingLeft: 24,
  },
  desc: {
    marginTop: 8
  }
})

export default OrderState;
