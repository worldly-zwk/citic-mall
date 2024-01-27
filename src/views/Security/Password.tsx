import { StyleSheet, View } from 'react-native';
import { Button, Form, Input } from '@/components';

const SecurityPassword = () => {
  return (
    <Form style={styles.container}>
      <View style={styles.group}>
        <Form.Item style={styles.formItem}>
          <Input size="middle" bordered={false} placeholder="请输入原密码" />
        </Form.Item>
      </View>
      <View style={styles.group}>
        <Form.Item style={styles.formItem}>
          <Input size="middle" placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item style={styles.formItem}>
          <Input size="middle" bordered={false} placeholder="请再次输入新密码" />
        </Form.Item>
      </View>
      
      <Button style={styles.submit}>确定</Button>
    </Form>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    rowGap: 12,
  },
  group: {
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  formItem: {
    marginBottom: 0,
  },
  input: {
    paddingHorizontal: 12,
  },
  submit: {
    marginTop: 74,
  }
});

export default SecurityPassword;
