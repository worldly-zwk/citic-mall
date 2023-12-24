import { useCallback, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { useBoolean } from '@/hooks';
import { LOGIN_APP_KEY, LOGIN_CHECK_CHANNEL, LOGIN_SCENE } from '@/constants';
import GlobalBack from '@/components/GlobalBack';
import { LoginScreenProps } from '@/typings/screen';
import Typography from '@/components/Typography';
import Space from '@/components/Space';
import request from '@/utils/request';
import { SSO } from '@/services';
import ModalCaptcha from '@/components/ModalCaptcha';
import LoginForm, { LoginState } from './LoginForm';

const Login = ({ route, navigation }: LoginScreenProps) => {
  const [state, setState] = useState<LoginState>({
    phone: '',
  });

  const [visible, setVisible] = useBoolean(false);

  const handleSubmit = useCallback((values: LoginState) => {
    setState(values);
    setVisible(true);
  }, [navigation]);

  const handleFinish = useCallback((info: any) => {
    if (info.pass) {
      const token = `${LOGIN_APP_KEY}:${Date.now()}:${Math.random()}`;
      request.get(`${SSO.sms}/${state.phone}/${state.type}`, {
        token,
        scene: LOGIN_SCENE,
        session: info.rid,
        checkChannel: LOGIN_CHECK_CHANNEL,
      }).then(() => {
        navigation.navigate('SMSCode', { phone: state.phone, session: info.rid });
      });
    }
    setVisible(false);
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
