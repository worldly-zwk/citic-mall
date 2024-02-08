import { create } from 'zustand';
import { SELLER } from '@/services';
import request from '@/utils/request';

interface SellerStore {
  loading: boolean;
  sellerInfo: API.SellerIndex | null;
  init(id: number, init?: boolean): Promise<API.SellerIndex>;
}

const useSeller = create<SellerStore>()((set, get) => ({
  loading: false,
  sellerInfo: null,
  init: async (id: number, init = false) => {
    const { sellerInfo } = get();
    if (!sellerInfo || init) {
      set({ loading: true, sellerInfo: null });
      const result = await request.get<API.SellerIndex>(`${SELLER.index}/${id}`).finally(() => {
        set({ loading: false });
      });
      set({ sellerInfo: result });
      return result;
    }
    return sellerInfo;
  },
}));

export default useSeller;
