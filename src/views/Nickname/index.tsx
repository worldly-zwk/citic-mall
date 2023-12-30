import { StyleSheet, View } from 'react-native';
import { Button, Card, Form, Input, Typography } from '@/components';

const { Text, Title } = Typography;

const Nickname = () => {
  return (
    <Form style={styles.container}>
      <Title level={1} style={styles.title}>昵称</Title>
      <Form.Item>
        <Input placeholder="请输入昵称" />
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
    marginTop: 53,
  }
});

export default Nickname;
