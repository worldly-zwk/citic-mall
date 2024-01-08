import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from '@/components';
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
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>

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
    backgroundColor: '#fff'
  }
})

export default Wallet;
