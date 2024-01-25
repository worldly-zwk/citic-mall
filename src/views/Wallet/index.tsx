import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Button, Form, FormInstance, Input, Link, Popup, Tabs, Typography } from '@/components';
import { WalletScreenProps, WalletTab } from '@/typings';
import { WALLET_TABS } from '@/constants';
import { useMember } from '@/store';
import { MEMBER, PROMOTION } from '@/services';
import WalletList from './List';
import { useBoolean } from '@/hooks';
import { request } from '@/utils';

const Wallet = ({ route }: WalletScreenProps) => {
  const { tab } = route.params;
  const formRef = useRef<FormInstance>();
  const insets = useSafeAreaInsets();
  const [activeKey, setActiveKey] = useState(tab);
  const [visible, actions] = useBoolean();
  const isCoupon = activeKey === WalletTab.COUPON;
  const memberState = useMember(state => state.state);
  const countEnum = [memberState?.couponPlatformNum, memberState?.couponNum, memberState?.couponThirdNum];
  const serviceEnmu = [MEMBER.redEnvelope, MEMBER.coupon, MEMBER.other];

  const handleFinish = useCallback(() => {
    const destroy = Alert.loading();
    const ticketSn = formRef.current?.getFieldValue('ticketSn');
    if (isCoupon) {
      return request.post(PROMOTION.bindingCoupon, { couponSn: ticketSn }).finally(destroy);
    }
    return request.post(PROMOTION.bindingRedEnvelope, { couponPlatformSn: ticketSn }).finally(destroy);
  }, [isCoupon]);

  return (
    <View style={styles.container}>
      <Tabs style={styles.container} defaultActiveKey={tab} scrollable={false} onChange={setActiveKey}>
        {WALLET_TABS.map((item, index) => {
          return (
            <Tabs.Item title={`${item.title}(${countEnum[index] || 0})`} value={item.value} key={item.value}>
              <WalletList service={serviceEnmu[item.value]} contentContainerStyle={styles.main} />
            </Tabs.Item>
          )
        })}
      </Tabs>
      {activeKey !== WalletTab.OTHER && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 4 }]}>
          {isCoupon ? (
            <Link style={[styles.button, styles.bordered]} to={{ screen: 'CouponList' }}>
              <Typography.Text color="primary" size={15}>去领券中心</Typography.Text>
            </Link>
          ) : (
            <Link style={[styles.button, styles.bordered]} to={{ screen: 'RedEnvelopeList' }}>
              <Typography.Text color="primary" size={15}>去抢红包</Typography.Text>
            </Link>
          )}
          <Link style={styles.button} onPress={actions.setTrue}>
            <Typography.Text size={15}>兑换</Typography.Text>
          </Link>
        </View>
      )}
      <Popup
        visible={visible}
        title={`兑换${isCoupon ? '优惠券' : '红包'}`}
        style={{ overflow: 'hidden' }}
        headerStyle={{ backgroundColor: '#f5f6fa' }}
        onClose={actions.setFalse}
      >
        <Form style={styles.form} ref={formRef}>
          <Form.Item name="ticketSn" style={{ marginBottom: 80 }}>
            <Input size="middle" bordered={false} style={styles.input} placeholder="请输入优惠码" />
          </Form.Item>
          <Button onPress={handleFinish}>确定</Button>
        </Form>
      </Popup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 5,
    backgroundColor: '#f5f6fa',
  },
  footer: {
    padding: 4,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  button: {
    flex: 1,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordered: {
    borderRightColor: '#f5f6fa',
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  form: {
    height: 400,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  input: {
    borderRadius: 2,
    backgroundColor: '#f5f6fa',
  }
})

export default Wallet;
