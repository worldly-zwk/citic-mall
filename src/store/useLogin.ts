import { create } from 'zustand';
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
}

const useLogin = create<LoginStore>()((set, get) => ({
  getSMSCode: (state: LoginState) => {
    const { phone, ...restParams } = state;
    return request.get(`${SSO.sms}/${phone}/1`, {
      ...restParams,
      scene: LOGIN_SCENE,
      token: `${LOGIN_APP_KEY}:${Date.now()}:${Math.random()}`,
      checkChannel: LOGIN_CHECK_CHANNEL,
    });
  },
  SMSLogin: async (data) => {
    const result = await request.post(SSO.smsLogin, data);
    useMember.getState().init();
    return result;
  }
}));

export default useLogin;
