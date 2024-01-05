import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Tabs, Ticket } from '@/components';
import { WalletScreenProps } from '@/typings/screen';
import { WALLET_TABS } from '@/constants';
import { useMember } from '@/store';
import WalletList from './LIst';
import { MEMBER } from '@/services';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Wallet = ({ route, navigation }: WalletScreenProps) => {
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
            <Tabs.Item title={`${item.title}(${countEnum[index]})`} value={item.value} key={item.value}>
              <WalletList service={serviceEnmu[item.value]} contentContainerStyle={[styles.main, { paddingBottom: insets.bottom }]} />
            </Tabs.Item>
          )
        })}
      </Tabs>
      <View style={styles.footer}>

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
