import { StyleSheet, View } from 'react-native';
import { Button, Card, Form, Input, Typography } from '@/components';
import { useMember } from '@/store';

const { Title, Text } = Typography;


const SecurityPhone = () => {
  const member = useMember(state => state.member);

  return (
    <Form style={styles.container}>
      <Title level={1} style={styles.title}>绑定手机</Title>
      <Text style={styles.subtitle}>当前手机号</Text>
      <Form.Item>
        <Input size="middle" value={member?.name} editable={false} placeholder="请输入邮箱" />
      </Form.Item>
      <Button style={styles.submit}>更换手机号</Button>
    </Form>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  title: {
    paddingTop: 50,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
  },
  submit: {
    marginTop: 40,
  }
})

export default SecurityPhone;
