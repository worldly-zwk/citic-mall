import { create } from 'zustand';
import { MEMBER, SSO } from '@/services';
import request from '@/utils/request';

interface MemberStore {
  login: boolean;
  member: null | API.Member;
  init(): void;
}

const useMember = create<MemberStore>((set) => ({
  login: false,
  member: null,
  init: async () => {
    const login = await request.get<boolean>(SSO.loggedOn);
    set({ login });
    if (login) {
      const member = await request.get<API.Member>(MEMBER.member);
      set({ member });
    }
  }
}));

export default useMember;
