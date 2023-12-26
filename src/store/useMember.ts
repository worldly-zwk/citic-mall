import { create } from 'zustand';
import { MEMBER, ORDER, SSO } from '@/services';
import request from '@/utils/request';

interface MemberStore {
  count: number;
  login: boolean;
  member: null | API.Member;
  init(): void;
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
  }
}));

export default useMember;
