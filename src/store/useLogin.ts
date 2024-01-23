import { create } from 'zustand';
import { Alert } from '@/components';
import { SSO } from '@/services';
import request from '@/utils/request';
import { LOGIN_SCENE, LOGIN_CHECK_CHANNEL, LOGIN_APP_KEY } from '@/constants';
import useMember from './useMember';

interface LoginState {
  phone: string;
  session: string;
}

interface LoginStore {
  getSMSCode: (state: LoginState) => Promise<any>;
  SMSLogin: (data: any) => Promise<any>;
  logout: () => Promise<boolean>;
}

const useLogin = create<LoginStore>()((set, get) => ({
  getSMSCode: (state: LoginState) => {
    const { phone, ...restParams } = state;
    const destroy = Alert.loading();
    return request.get(`${SSO.sms}/${phone}/1`, {
      ...restParams,
      scene: LOGIN_SCENE,
      token: `${LOGIN_APP_KEY}:${Date.now()}:${Math.random()}`,
      checkChannel: LOGIN_CHECK_CHANNEL,
    }).finally(destroy);
  },
  SMSLogin: async (data) => {
    const destroy = Alert.loading();
    const success = await request.post(SSO.smsLogin, data);
    if (success) {
      useMember.setState({ login: true });
      useMember.getState().init();
    }
    destroy();
    return success;
  },
  logout: () => {
    const destroy = Alert.loading();
    return request.get<boolean>(SSO.logout).finally(destroy);
  }
}));

export default useLogin;
