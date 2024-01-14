import { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Form, FormInstance, Input, Typography } from '@/components';
import { NicknameScreenProps } from '@/typings';
import { useMember } from '@/store';

const { Title } = Typography;

const Nickname = ({ route, navigation }: NicknameScreenProps) => {
  const formRef = useRef<FormInstance>(null);
  const setMember = useMember(state => state.set);

  const handleSubmit = useCallback(() => {
    setMember(formRef.current?.getFieldsValue()).then(success => {
      if (success) {
        navigation.goBack();
      }
    });
  }, [setMember]);

  return (
    <Form initialValues={{ nickname: route.params.name }} style={styles.container} ref={formRef}>
      <Title level={1} style={styles.title}>昵称</Title>
      <Form.Item name="nickname">
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Button style={styles.submit} onPress={handleSubmit}>确定</Button>
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
