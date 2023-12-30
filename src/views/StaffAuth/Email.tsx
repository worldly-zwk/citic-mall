import { StyleSheet, View } from 'react-native';
import { Button, Card, Form, Input, Typography } from '@/components';

const { Text, Title } = Typography;

const StaffAuthEmail = () => {
  return (
    <Form style={styles.container}>
      <Title level={1} style={styles.title}>邮箱自动认证</Title>
      <Form.Item>
        <Input placeholder="请输入中信内部企业邮箱" />
      </Form.Item>
      <Form.Item>
        <Input
          extra={(
            <Button size="small" round>获取验证码</Button>
          )}
          placeholder="请输入邮箱验证码"
        />
      </Form.Item>
      <Button style={styles.submit}>确定</Button>
    </Form>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fff'
  },
  title: {
    paddingVertical: 48
  },
  submit: {
    marginTop: 29,
  }
});

export default StaffAuthEmail;
