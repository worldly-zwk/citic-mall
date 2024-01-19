import { useCallback, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Typography, Button, Input } from '@/components';
import { SMSCodeScreenProps } from '@/typings';
import { useSetState, useTimer } from '@/hooks';
import { useLogin } from '@/store';

const SMSCode = ({ route, navigation }: SMSCodeScreenProps) => {
  const { phone, session } = route.params;
  const [count, timerActions] = useTimer(60);
  const SMSLogin = useLogin(state => state.SMSLogin);
  const [state, setState] = useSetState({
    mobileVerifyCode: '',
    isAgreement: true,
    isPushUnion: false,
  });

  const handleResend = useCallback(() => {
    timerActions.start(60);
  }, [timerActions]);

  const handleLogin = useCallback(() => {
    SMSLogin({
      mobile: phone,
      ...state
    }).then(() => {
      navigation.getParent()?.goBack();
    });
  }, [phone, state]);

  useEffect(() => {
    timerActions.start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.header}>
          <Typography.Title level={1} style={{ fontWeight: 'normal' }}>验证码登录</Typography.Title>
          <Typography.Text style={styles.subtitle} color="secondary">验证码已发送至 {phone}</Typography.Text>
        </View>
        <View style={styles.section}>
          <Input
            placeholder="请输入验证码"
            keyboardType="number-pad"
            onChangeText={text => setState({ mobileVerifyCode: text })}
            extra={(
              <Button size="small" round onPress={handleResend} disabled={count > 0}>重新发送{count || ''}</Button>
            )}
          />
          <Button style={styles.button} onPress={handleLogin}>确认</Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 100,
    marginBottom: 12,
  },
  subtitle: {
    marginTop: 14,
    marginBottom: 21,
  },
  section: {
    flex: 1,
  },
  button: {
    marginTop: 30,
  }
})

export default SMSCode;
