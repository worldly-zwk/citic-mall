import { useCallback } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SettingsScreenProps } from '@/typings/screen';
import { Alert, Cell, Link, Tag, Typography } from '@/components';
import { useMember } from '@/store';

const CellGroup = Cell.Group;

const Settings = ({ route, navigation }: SettingsScreenProps) => {
  const authMember = useMember(state => state.auth);

  const handleLogOut = useCallback(() => {
    Alert.confirm({
      message: '确定要退出登录吗？',
      okText: '确定退出'
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: '#f5f6fa' }} contentContainerStyle={styles.main}>
        <CellGroup>
          <Cell prefix={require('@/assets/images/icons/user.png')} label="个人信息" to={{ screen: 'ProfileInfo' }} />
        </CellGroup>
        <CellGroup>
          <Cell prefix={require('@/assets/images/icons/map.png')} label="地址管理" to={{ screen: 'Address' }} />
          <Cell prefix={require('@/assets/images/icons/shield.png')} label="实名认证" contentStyle={{ justifyContent: 'flex-start' }} to={{ screen: 'RealNameAuth' }}>
            <Tag color={authMember ? undefined : 'disabled'}>{authMember ? '已认证' : '未认证'}</Tag>
          </Cell>
          <Cell prefix={require('@/assets/images/icons/lock.png')}  label="账号安全" to={{ screen: 'Security' }} />
        </CellGroup>
        <CellGroup>
          <Cell prefix={require('@/assets/images/icons/book.png')}  label="用户协议" to={{ screen: 'Agreement', params: { id: 63 } }} />
          <Cell prefix={require('@/assets/images/icons/secret.png')} label="隐私政策" to={{ screen: 'Agreement', params: { id: 67 } }} />
          <Cell prefix={require('@/assets/images/icons/book.png')} label="营业资质" isLink />
        </CellGroup>
      </ScrollView>
      <Link style={styles.logout} onPress={handleLogOut}>
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
