import { create } from 'zustand';
import { MEMBER, SELLER } from '@/services';
import request from '@/utils/request';
import { toast } from '@/utils';

interface SellerStore {
  loading: boolean;
  sellerInfo: API.SellerIndex | null;
  init(id: number, init?: boolean): Promise<API.SellerIndex>;
  update(id: number): Promise<API.SellerIndex>;
  collection(id: number, collection: boolean): Promise<boolean>;
}

const useSeller = create<SellerStore>()((set, get) => ({
  loading: false,
  sellerInfo: null,
  init: async (id: number, init = false) => {
    const { sellerInfo, update } = get();
    if (!sellerInfo || init) {
      set({ loading: true, sellerInfo: null });
      return update(id).finally(() => {
        set({ loading: false });
      });
    }
    return sellerInfo;
  },
  update: async (id: number) => {
    const result = await request.get<API.SellerIndex>(`${SELLER.index}/${id}`);
    set({ sellerInfo: result });
    return result;
  },
  collection: async (id: number, collection: boolean) => {
    const { sellerInfo, update } = get();
    if (collection) {
      await request.post(MEMBER.collectionSeller, { sellerId: id });
    } else {
      await request.delete(MEMBER.collectionSeller, { sellerId: id });
    }
    set({
      sellerInfo: {
        ...sellerInfo as API.SellerIndex,
        collected: String(collection),
      }
    });
    await update(id);
    toast(collection ? '收藏成功' : '取消收藏');
    return true;
  }
}));

export default useSeller;
