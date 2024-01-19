import { useCallback, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { useBoolean } from '@/hooks';
import { LoginScreenProps } from '@/typings';
import { Space, Typography, ModalCaptcha, GlobalBack } from '@/components';
import LoginForm, { LoginState } from './LoginForm';
import { useLogin } from '@/store';
import { toast } from '@/utils';

const Login = ({ navigation }: LoginScreenProps) => {
  const getSMSCode = useLogin(state => state.getSMSCode);
  const [state, setState] = useState<LoginState>({
    phone: '',
  });

  const [visible, setVisible] = useBoolean(false);

  const handleSubmit = useCallback((values: LoginState) => {
    setState(values);
    setVisible(true);
  }, [navigation]);

  const handleFinish = useCallback((info: any) => {
    setVisible(false);
    if (info.pass) {
      const { type, phone } = state;
      if (type === 1) {
        getSMSCode({
          phone,
          session: info.rid,
        }).then(() => {
          toast('发送成功');
          navigation.navigate('SMSCode', { phone: state.phone, session: info.rid });
        });
      }
    }
  }, [state]);

  return (
    <SafeAreaView style={styles.container}>
      <GlobalBack icon='closed' style={styles.closed} />
      <View style={styles.main}>
        <Space size={10}>
          <Image style={styles.logo} source={require('@/assets/images/view/logo.png')} />
          <Typography.Title level={1} style={{ fontWeight: 'normal' }}>中信易家</Typography.Title>
        </Space>
        <View style={styles.section}>
          <LoginForm onSubmit={handleSubmit} />
        </View>
      </View>
      <ModalCaptcha visible={visible} onFinish={handleFinish} onClose={setVisible} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  closed: {
    marginTop: 10,
    marginLeft: 12,
  },
  main: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 47,
    height: 28
  },
  section: {
    flex: 1,
    marginTop: 47,
  }
})

export default Login;
