import { StyleSheet, View } from 'react-native';
import { Card, Typography } from '@/components';

const { Text } = Typography;


const StaffAuthPhone = () => {
  return (
    <View style={{ padding: 12 }}>
      <Card contentStyle={styles.container}>
        <Text color="secondary">请拨打客服热线 <Text color="#4dafea" size="large">4000020616-1</Text></Text>
        <Text color="secondary">说明您的员工认证请求</Text>
      </Card>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    height: 208,
    rowGap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default StaffAuthPhone;
