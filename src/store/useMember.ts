import { create } from 'zustand';
import { MEMBER, SSO } from '@/services';
import request from '@/utils/request';

interface MemberStore {
  auth: boolean;
  login: boolean;
  state: null | API.MemberState;
  member: null | API.Member;
  init(): void;
  set(info: Partial<API.Member>): Promise<boolean>;
  update(): Promise<API.Member>;
}

const useMember = create<MemberStore>()((set, get) => ({
  auth: false,
  login: false,
  state: null,
  member: null,
  init: async () => {
    const login = await request.get<boolean>(SSO.loggedOn);
    set({ login });
    if (login) {
      get().update();
    }
  },
  set: async (info) => {
    const success = await request.put<boolean>(MEMBER.member, info, {
      requestType: 'urlencoded'
    });
    if (success) {
      await get().update();
    }
    return success;
  },
  update: () => {
    request.get<boolean>(MEMBER.authUsable).then(auth => {
      set({ auth });
    });
    request.get<API.MemberState>(MEMBER.index).then(state => {
      set({ state });
    });
    return request.get<API.Member>(MEMBER.member).then(member => {
      set({ member });
      return member;
    });
  }
}));

export default useMember;
