import { useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Form, Input } from '@/components';
import { ContactFormScreenProps } from '@/typings';


const ContactForm = ({ route, navigation }: ContactFormScreenProps) => {

  const handleFinish = useCallback(() => {
    // const values = formRef.current?.getValues();
    // submitAddress({
    //   ...values,
    //   townId: 0,
    //   cityId: 72,
    //   areaId: 2799,
    //   provinceId: 1,
    //   state: values.state ? 1 : 2
    // }).then(address => {
    //   if (params?.source) {
    //     orderUpdate({ addressId: address.id });
    //     navigation.navigate(params.source);
    //   } else {
    //     navigation.goBack();
    //   }
    // })
  }, []);
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        <Form>
          <View style={styles.card}>
            <Form.Item name="idCardName" style={styles.formItem}>
              <Input size="middle" placeholder="请输入真实姓名" />
            </Form.Item>
            <Form.Item name="idCardNo" style={styles.formItem}>
              <Input size="middle" bordered={false} placeholder="请输入姓名对应的身份证号" />
            </Form.Item>
          </View>
        </Form>
      </ScrollView>
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
  main: {
    rowGap: 12,
    padding: 12,
  },
  card: {
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
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
   