import { useCallback, useEffect, useMemo, useRef } from 'react';
import { SafeAreaView, StyleSheet, Switch, TextInput, View } from 'react-native';
import { Button, Form, Notice } from '@/components';
import { AddressFormScreenProps } from '@/typings';
import { FormInstance } from '@/components/Form/typings';
import { MEMBER } from '@/services';
import request from '@/utils/request';
import { useOrder } from '@/store';

const AddressForm = ({ route, navigation }: AddressFormScreenProps) => {
  const { params } = route;
  const formRef = useRef<FormInstance>(null);

  const orderUpdate = useOrder(state => state.update);

  const initialValues = useMemo(() => {
    if (params?.address) {
      const { address } = params;
      return {
        ...address,
        state: address.state === 1
      }
    }
    return {};
  }, [route.params]);

  const submitAddress = useCallback((values: API.Address) => {
    if (params?.id) {
      return request.put<API.Address>(`${MEMBER.address}/${params.id}`, values);
    }
    return request.post<API.Address>(MEMBER.address, values);
  }, [params]);

  const handleFinish = useCallback(() => {
    const values = formRef.current?.getValues();
    submitAddress({
      ...values,
      townId: 0,
      cityId: 72,
      areaId: 2799,
      provinceId: 1,
      state: values.state ? 1 : 2
    }).then(address => {
      if (params?.source) {
        orderUpdate({ addressId: address.id });
        navigation.navigate(params.source);
      } else {
        navigation.goBack();
      }
    })
  }, [submitAddress]);

  useEffect(() => {
    if (params?.id) {
      navigation.setOptions({ title: '编辑收货地址' });
    }
  }, []);
  

  return (
    <View style={styles.container}>
      <Notice showIcon>尊敬的用户：您填写的信息仅用于下单使用，活动服务方承诺，对您的信息安全储存、严格保密。</Notice>
      <Form layout="horizontal" initialValues={initialValues} style={styles.form} ref={formRef}>
        <Form.Item name="memberName" label="联系人" style={styles.formItem}>
          <TextInput style={styles.input} placeholder="请输入收货人姓名" />
        </Form.Item>
        <Form.Item name="mobile" label="联系电话" style={styles.formItem}>
          <TextInput style={styles.input} placeholder="请输入收货人电话" />
        </Form.Item>
        <Form.Item name="addAll" label="所在地区" style={styles.formItem}>
          <TextInput style={styles.input} placeholder="请选择所在区域" />
        </Form.Item>
        <Form.Item name="addressInfo" label="详细地址" style={[styles.formItem, styles.areaItem]}>
          <TextInput style={styles.textarea} multiline placeholder="请输入详细地址，不少于5个字" />
        </Form.Item>
        <Form.Item name="state" label="设为默认" style={styles.formItem} contentStyle={styles.switchContainer}>
          <Switch />
        </Form.Item>
      </Form>
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleFinish}>保存并使用</Button>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
  formItem: {
    paddingLeft: 12,
    marginBottom: 0,
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 15,
  },
  textarea: {
    height: 88,
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  areaItem: {
    marginBottom: 10,
    borderWidth: 0,
  },
  switchContainer: {
    paddingRight: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  }
})

export default AddressForm;
   