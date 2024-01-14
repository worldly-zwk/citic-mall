import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { EventArg } from '@react-navigation/native';
import { Space, Typography, Button, Card, Radio, Icon, Alert } from '@/components';
import { OrderPaymentScreenProps } from '@/typings';
import { useRequest, useTimerWithClock } from '@/hooks';
import { ORDER } from '@/services';

const { Text } = Typography;

const OrderPayment = ({ route, navigation }: OrderPaymentScreenProps) => {
  const [payment, setPayment] = useState('');
  const [clock, actions] = useTimerWithClock(0);
  const [state] = useRequest<API.Payment>(ORDER.payment, {
    defaultParams: {
      orderSn: route.params?.orderSn || 'FD2024011420411381121395'
    },
    onSuccess: result => {
      setPayment(result.paymentList[0].code);
    }
  });

  const order = state.data?.order;

  useEffect(() => {
    const handleBeforeRemove = (e: EventArg<'beforeRemove', true, { action: any }>) => {
      e.preventDefault();
      Alert.confirm({
        message: '确认要离开收银台吗？',
        contentStyle: { fontWeight: '600' },
        okText: '继续支付',
        cancelText: '确认离开',
        onCancel: () => {
          navigation.dispatch(e.data.action);
        }
      });
    }
    if (order?.restTime) {
      actions.start(order.restTime / 1000);
    }
    navigation.addListener('beforeRemove', handleBeforeRemove);
    return () => {
      actions.cancel();
      navigation.removeListener('beforeRemove', handleBeforeRemove);
    };
  }, [order?.restTime]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main} contentContainerStyle={{ rowGap: 12 }}>
        <Card contentStyle={{ paddingVertical: 0 }}>
          <View style={styles.section}>
            <Text size={15} color="secondary">支付金额</Text>
            <Text size={36} color="primary" strong>¥{order?.payMoney}</Text>
          </View>
          <Space style={styles.timer} justify="center" align="center">
            <Text style={styles.text}>支付剩余时间</Text>
            <View style={styles.time}>
              <Text style={styles.text}>{clock.hours}</Text>
            </View>
            <Text style={styles.text}>时</Text>
            <View style={styles.time}>
              <Text style={styles.text}>{clock.minute}</Text>
            </View>
            <Text style={styles.text}>分</Text>
            <View style={styles.time}>
              <Text style={styles.text}>{clock.second}</Text>
            </View>
            <Text style={styles.text}>秒</Text>
          </Space>
        </Card>
        <Card contentStyle={{ paddingVertical: 0 }}>
          {state.data?.paymentList.map(({ image, name, code }) => {
            const handlePress = () => {
              setPayment(code);
            }
            return (
              <TouchableWithoutFeedback onPress={handlePress} key={code}>
                <Space style={styles.item}>
                  <Icon size={24} icon={{ uri: image }} />
                  <Text style={{ flex: 1 }}>{name}</Text>
                  <Radio checked={payment === code} onPress={handlePress} />
                </Space>
              </TouchableWithoutFeedback>
            )
          })}
        </Card>
      </ScrollView>
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button}>确定支付¥{order?.payMoney}</Button>
      </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 12,
  },
  section: {
    paddingVertical: 56,
    alignItems: 'center',
    rowGap: 8,
  },
  text: {
    fontSize: 13,
    color: '#666',
  },
  timer: {
    paddingVertical: 12,
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  time: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 2,
    marginLeft: 8,
    marginRight: 2,
  },
  item: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  }
})

export default OrderPayment;
