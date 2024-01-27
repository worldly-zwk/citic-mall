import { useCallback, useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Alert, Button, Form, FormInstance, Input } from '@/components';
import { ContactFormScreenProps } from '@/typings';
import { request } from '@/utils';
import { MEMBER } from '@/services';


const ContactForm = ({ navigation }: ContactFormScreenProps) => {
  const formRef = useRef<FormInstance>()

  const handleFinish = useCallback(() => {
    const values = formRef.current?.getFieldsValue();
    if (values) {
      const destroy = Alert.loading();
      request.post(MEMBER.thirdAuth, values).then(() => {
        navigation.goBack();
      }).finally(destroy);
    }
  }, []);
  

  return (
    <View style={styles.container}>
      <Form style={styles.container} layout="horizontal" labelWidth={86} ref={formRef}>
        <View style={{ paddingLeft: 12, backgroundColor: 'white' }}>
          <Form.Item name="idCardName" label="联系人" style={styles.formItem}>
            <Input size="middle" bordered={false} placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item name="idCardNo" label="身份证号码" style={styles.formItem}>
            <Input size="middle" bordered={false} placeholder="请输入证件号码" />
          </Form.Item>
        </View>
      </Form>
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleFinish}>保存</Button>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formItem: {
    marginBottom: 0,
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  },
})

export default ContactForm;
   