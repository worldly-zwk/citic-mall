import { create } from 'zustand';
import { MEMBER, ORDER, SSO } from '@/services';
import request from '@/utils/request';

interface MemberStore {
  count: number;
  login: boolean;
  member: null | API.Member;
  init(): void;
  set(info: Partial<API.Member>): Promise<boolean>;
}

const useMember = create<MemberStore>((set) => ({
  count: 0,
  login: false,
  member: null,
  init: async () => {
    request.get<number>(ORDER.count).then(count => {
      set({ count });
    });
    const login = await request.get<boolean>(SSO.loggedOn);
    set({ login });
    if (login) {
      const member = await request.get<API.Member>(MEMBER.member);
      set({ member });
    }
  },
  set: async (info) => {
    const success = await request.put<boolean>(MEMBER.member, info, {
      requestType: 'urlencoded'
    });
    if (success) {
      const member = await request.get<API.Member>(MEMBER.member);
      set({ member });
    }
    return success;
  },
}));

export default useMember;
