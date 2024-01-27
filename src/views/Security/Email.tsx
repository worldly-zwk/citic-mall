import { useCallback, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Alert, Button, Form, FormInstance, Input, Typography } from '@/components';
import { SecurityEmailScreenProps } from '@/typings';
import { request, toast } from '@/utils';
import { MEMBER } from '@/services';

const { Title } = Typography;

const SecurityEmail = ({ navigation }: SecurityEmailScreenProps) => {
  const formRef = useRef<FormInstance>();
  const [stamp, setStamp] = useState(Date.now());

  const handleFinish = useCallback(() => {
    const values = formRef.current?.getFieldsValue();
    if (values) {
      console.log(values);
      const destroy = Alert.loading();
      request.post(MEMBER.bindEmail, values, { requestType: 'urlencoded' }).then(() => {
        toast('绑定成功');
        navigation.goBack();
      }).finally(destroy);
    }
  }, []);

  return (
    <Form style={styles.container} ref={formRef}>
      <Title level={1} style={styles.title}>绑定邮箱</Title>
      <Form.Item name="email" style={styles.formItem}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="verificationCode" style={styles.formItem}>
        <Input
          extra={(
            <TouchableWithoutFeedback onPress={() => setStamp(Date.now())}>
              <Image style={styles.code} source={{ uri: `https://sapi.citic-mall.com/api/sso/system/captcha?t=${stamp}` }} />
            </TouchableWithoutFeedback>
          )}
          placeholder="请输入验证码"
        />
      </Form.Item>
      <Button style={styles.submit} onPress={handleFinish}>验证邮箱</Button>
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
  formItem: {
    marginBottom: 0,
  },
  code: {
    width: 76,
    height: 30,
  },
  submit: {
    marginTop: 29,
  }
});

export default SecurityEmail;
