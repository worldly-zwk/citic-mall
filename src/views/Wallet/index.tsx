import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, Tabs, Typography } from '@/components';
import { WalletScreenProps } from '@/typings/screen';
import { WALLET_TABS } from '@/constants';
import { useMember } from '@/store';
import { MEMBER } from '@/services';
import WalletList from './List';


const Wallet = ({ route }: WalletScreenProps) => {
  const { tab } = route.params;
  const insets = useSafeAreaInsets();
  const memberState = useMember(state => state.state);
  const countEnum = [memberState?.couponPlatformNum, memberState?.couponNum, memberState?.couponThirdNum];
  const serviceEnmu = [MEMBER.redEnvelope, MEMBER.coupon, MEMBER.other];

  return (
    <View style={styles.container}>
      <Tabs style={styles.container} defaultActiveKey={tab} scrollable={false}>
        {WALLET_TABS.map((item, index) => {
          return (
            <Tabs.Item title={`${item.title}(${countEnum[index] || 0})`} value={item.value} key={item.value}>
              <WalletList service={serviceEnmu[item.value]} contentContainerStyle={styles.main} />
            </Tabs.Item>
          )
        })}
      </Tabs>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 4 }]}>
        <Link style={[styles.button, styles.bordered]}>
          <Typography.Text color="primary" size={15}>去抢红包</Typography.Text>
        </Link>
        <Link style={styles.button}>
          <Typography.Text size={15}>兑换</Typography.Text>
        </Link>
      </View>
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
  }
})

export default Wallet;
