import { useCallback } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Form, Input, Notice, Space, Typography } from '@/components';
import { RealNameAuthFormScreenProps } from '@/typings';
import { AUTH_RULES } from '@/constants';


const RealNameAuthForm = ({ route, navigation }: RealNameAuthFormScreenProps) => {

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
        <Form style={{ rowGap: 12 }}>
          <View style={styles.card}>
            <View style={styles.head}>
              <Typography.Text strong>身份信息(必填)</Typography.Text>
            </View>
            <Form.Item name="idCardName" style={styles.formItem}>
              <Input size="middle" placeholder="请输入真实姓名" />
            </Form.Item>
            <Form.Item name="idCardNo" style={styles.formItem}>
              <Input size="middle" bordered={false} placeholder="请输入姓名对应的身份证号" />
            </Form.Item>
          </View>
          <View style={[styles.card, { paddingHorizontal: 0 }]}>
            <View style={[styles.head, { paddingHorizontal: 12 }]}>
              <Typography.Text strong>身份证正反面信息(选填)</Typography.Text>
            </View>
            <Notice>{`温馨提示：\n请上传原始比例的身份证正反面，请勿剪裁图改，以保证身份信息清晰显示，否则无法通过审核。`}</Notice>
            <Space style={styles.identity}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('@/assets/images/view/auth_front.png')} />
                <Typography.Text size="small" color="disabled" align="center">身份证人像面</Typography.Text>
              </View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('@/assets/images/view/auth_back.png')} />
                <Typography.Text size="small" color="disabled" align="center">身份证国徽面</Typography.Text>
              </View>
            </Space>
          </View>
          <View style={styles.card}>
            <View style={{ paddingVertical: 12 }}>
              <Typography.Text>为什么要进行实名认证？</Typography.Text>
            </View>
            <View style={styles.rules}>
              {AUTH_RULES.map((text, index) => (
                <Space size={8} key={index}>
                  <Typography.Text size="small" color="secondary" style={styles.text}>{index + 1}、</Typography.Text>
                  <View style={{ flex: 1 }}>
                    {text.split('\n').map((text, index) => (
                      <Typography.Text size="small" color="secondary" style={styles.text} key={index}>{text}</Typography.Text>
                    ))}
                  </View>
                </Space>
              ))}
            </View>
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
  head: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  formItem: {
    marginBottom: 0,
  },
  identity: {
    padding: 12,
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1.8,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 4,
  },
  rules: {
    rowGap: 12,
    paddingBottom: 12,
  },
  text: {
    lineHeight: 20,
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  },
})

export default RealNameAuthForm;
   