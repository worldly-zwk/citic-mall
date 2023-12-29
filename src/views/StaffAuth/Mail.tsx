import { View } from 'react-native';
import { Card, Typography } from '@/components';

const { Text } = Typography;

const StaffAuthMail = () => {
  return (
    <View style={{ padding: 12 }}>
      <Card contentStyle={{ padding: 15 }}>
        <Text color="secondary">
          通过企业邮箱编辑内容“<Text color="#d7000f">手机号+用户姓名+所属公司</Text>”发送至：<Text color="#d7000f" selectable>service@citic.com</Text>，认证成功后你将收到短信/邮件确认回复,如果两个工作日内没有收到回复.请拨打客服热线4000020616-1. 例如:187 0000 0000 张三 中信易家电子商务有限公司
        </Text>
      </Card>
    </View>
    
  )
}

export default StaffAuthMail;
