import { create } from 'zustand';
import { ORDER } from '@/services';
import request from '@/utils/request';

interface CartStore {
  cart: null | API.Cart;
  fetch: () => void;
  add: (data: API.AddCartParams) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
  update: (id: number, count: number) => Promise<number>;
  checkedSeller: (id: number, checked: boolean) => Promise<boolean>;
  checkedProduct: (id: number, checked: boolean) => Promise<boolean>;
  check: (type: string) => Promise<boolean>;
}

const useCart = create<CartStore>((set, get) => ({
  cart: null,
  fetch: async () => {
    const cart = await request.get<API.Cart>(ORDER.cart);
    set({ cart });
    return cart;
  },
  add: (data: API.AddCartParams) => {
    return request.post<boolean, API.AddCartParams>(ORDER.cartAdd, data);
  },
  remove:  async (id: number) => {
    const data = await request.delete<boolean>(`${ORDER.cartRemove}/${id}`);
    get().fetch();
    return data;
  },
  update: async (id: number, count: number) => {
    await request.put<boolean>(ORDER.cartUpdate, undefined, {
      params: { id, count }
    });
    get().fetch();
    return count;
  },
  checkedSeller: async (id: number, checked: boolean) => {
    const selected = await request.put<boolean>(`${ORDER.cartSellerChecked}/${id}`, undefined, {
      params: { checked }
    });
    get().fetch();
    return selected;
  },
  checkedProduct: async (id: number, checked: boolean) => {
    const selected = await request.put<boolean>(`${ORDER.cartProductChecked}/${id}`, undefined, {
      params: { checked }
    });
    get().fetch();
    return selected;
  },
  check: async (mode: string) => {
    return request.post<boolean>(ORDER.check, {
      orderModel: mode
    });
  },
}));

export default useCart;
