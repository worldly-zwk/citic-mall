import { useCallback } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Cell, Link, Tag, Typography } from '@/components';
import { SettingsScreenProps } from '@/typings';
import { useLogin, useMember } from '@/store';

const CellGroup = Cell.Group;

const Settings = ({ navigation }: SettingsScreenProps) => {
  const insets = useSafeAreaInsets();
  const memberAuth = useMember(state => state.auth);
  const memberLogin = useMember(state => state.login);
  const memberLogout = useLogin(state => state.logout);


  const handleLogout = useCallback(() => {
    Alert.confirm({
      message: '确定要退出登录吗？',
      okText: '确定退出',
      onOk: () => {
        memberLogout().then(success => {
          if (success) {
            navigation.navigate('Index', { screen: 'Home' });
          }
        })
      }
    });
  }, [memberLogout]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        <CellGroup>
          <Cell auth prefix={require('@/assets/images/icons/user.png')} label="个人信息" to={{ screen: 'ProfileInfo' }} />
        </CellGroup>
        <CellGroup>
          <Cell auth prefix={require('@/assets/images/icons/map.png')} label="地址管理" to={{ screen: 'Address' }} />
          <Cell auth prefix={require('@/assets/images/icons/shield.png')} label="实名认证" contentStyle={{ justifyContent: 'flex-start' }} to={{ screen: 'RealNameAuth' }}>
            <Tag color={memberAuth ? undefined : 'disabled'}>{memberAuth ? '已认证' : '未认证'}</Tag>
          </Cell>
          <Cell auth prefix={require('@/assets/images/icons/lock.png')}  label="账号安全" to={{ screen: 'Security' }} />
        </CellGroup>
        <CellGroup>
          <Cell prefix={require('@/assets/images/icons/book.png')}  label="用户协议" to={{ screen: 'Agreement', params: { id: 63 } }} />
          <Cell prefix={require('@/assets/images/icons/secret.png')} label="隐私政策" to={{ screen: 'Agreement', params: { id: 67 } }} />
          <Cell prefix={require('@/assets/images/icons/book.png')} label="营业资质" isLink />
        </CellGroup>
      </ScrollView>
      {memberLogin && (
        <View style={{ backgroundColor: '#fff', paddingBottom: insets.bottom }}>
          <Link style={styles.logout} onPress={handleLogout}>
            <Typography.Text size="large">退出登录</Typography.Text>
          </Link>
        </View>
      )}
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
  logout: {
    alignItems: 'center',
    paddingVertical: 13.5
  }
})

export default Settings;
