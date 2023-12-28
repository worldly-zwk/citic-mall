import { useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SettingsScreenProps } from '@/typings/screen';
import { Cell, Link, Typography } from '@/components';

const CellGroup = Cell.Group;

const Settings = ({ route, navigation }: SettingsScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: '#f5f6fa' }} contentContainerStyle={styles.main}>
        <CellGroup>
          <Cell prefix={require('@/assets/images/icons/user.png')} label="个人信息" isLink></Cell>
        </CellGroup>
        <CellGroup>
          <Cell prefix={require('@/assets/images/icons/map.png')} label="地址管理" isLink to={{ screen: 'Address' }}></Cell>
          <Cell prefix={require('@/assets/images/icons/shield.png')} label="实名认证" isLink></Cell>
          <Cell prefix={require('@/assets/images/icons/lock.png')}  label="账号安全" isLink></Cell>
        </CellGroup>
        <CellGroup>
          <Cell prefix={require('@/assets/images/icons/book.png')}  label="用户协议" isLink></Cell>
          <Cell prefix={require('@/assets/images/icons/secret.png')} label="隐私政策" isLink></Cell>
          <Cell prefix={require('@/assets/images/icons/book.png')} label="营业资质" isLink></Cell>
        </CellGroup>
      </ScrollView>
      <Link style={styles.logout}>
        <Typography.Text size="large">退出登录</Typography.Text>
      </Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    rowGap: 12,
    padding: 12,
  },
  logout: {
    alignItems: 'center',
    paddingVertical: 13.5
  }
})

export default Settings;
