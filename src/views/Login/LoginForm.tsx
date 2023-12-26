import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSetState } from '@/hooks';
import Typography from '@/components/Typography';
import Space from '@/components/Space';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Link from '@/components/Link';
import { LoginTypeEnum } from '@/typings';

export interface LoginState {
  type?: LoginTypeEnum;
  phone: string;
  password?: string;
}

interface LoginFormProps {
  onSubmit?: (values: LoginState) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [state, setState] = useSetState<LoginState>({
    type: LoginTypeEnum.CODE,
    phone: '',
    password: '',
  });

  const toggleLoginMethod = useCallback(() => {
    setState((oldState) => {
      return {
        ...oldState,
        type: LoginTypeEnum.PASSWORD === oldState.type ? LoginTypeEnum.CODE : LoginTypeEnum.PASSWORD
      }
    })
  }, []);

  const setLoginPhone = useCallback((phone: string) => {
    setState({ phone });
  }, []);

  const setLoginPassword = useCallback((password: string) => {
    setState({ password });
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit?.(state);
  }, [state, onSubmit]);

  const renderInner = useCallback(() => {
    if (state.type === LoginTypeEnum.PASSWORD) {
      return (
        <View style={styles.inner}>
          <Input placeholder="请输入手机号" keyboardType="numeric" maxLength={11} onChangeText={setLoginPhone} />
          <Input placeholder="请输入密码" onChangeText={setLoginPassword}  />
        </View>
      )
    }
    return (
      <View style={styles.inner}>
        <Input placeholder="请输入手机号" keyboardType="numeric" maxLength={11} onChangeText={setLoginPhone} />
        <Typography.Text style={styles.help} size="small" color="disabled">未注册的手机号码验证后将自动创建账户</Typography.Text>
      </View>
    )
  }, [state]);

  return (
    <View style={styles.container}>
      {renderInner()}
      <Button style={styles.button} onPress={handleSubmit}>{state.type === LoginTypeEnum.CODE ? '获取短信验证码' : '登录'}</Button>
      <Space style={styles.actions}>
        <Link onPress={toggleLoginMethod}>
          <Typography.Text primary>{state.type === LoginTypeEnum.CODE ? '账号密码登录' : '手机快速登录'}</Typography.Text>
        </Link>
        {state.type === LoginTypeEnum.PASSWORD && (
          <Link>
            <Typography.Text color="secondary">忘记密码</Typography.Text>
          </Link>
        )}
      </Space>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    height: 96,
  },
  help: {
    marginTop: 14,
  },
  button: {
    marginTop: 20
  },
  actions: {
    marginTop: 20,
    justifyContent: 'space-between'
  }
})

export default LoginForm;
