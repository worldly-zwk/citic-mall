import { create } from 'zustand';
import Toast from 'react-native-root-toast';
import { ORDER } from '@/services';
import request from '@/utils/request';
import { OrderModel } from '@/typings';
import useOrder from './useOrder';

interface CartStore {
  cart: null | API.Cart;
  count: number;
  fetch: () => void;
  add: (data: API.AddCartParams) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
  update: (id: number, count: number) => Promise<number>;
  checkedSeller: (id: number, checked: boolean) => Promise<boolean>;
  checkedProduct: (id: number, checked: boolean) => Promise<boolean>;
  check: (type: OrderModel) => Promise<API.OrderCheck>;
  again: (orderSn: string) => Promise<boolean>;
}

const useCart = create<CartStore>((set, get) => ({
  cart: null,
  count: 0,
  fetch: async () => {
    request.get<number>(ORDER.count).then(count => {
      set({ count });
    });
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
  check: async (mode: OrderModel) => {
    const check = await request.post<API.OrderCheck>(ORDER.check, {
      orderModel: mode
    });
    if (check.code === 1) {
      await useOrder.getState().init(mode);
    }
    Toast.show(check.message);
    return check;
  },
  again: (orderSn: string) => request.get(ORDER.again, {
    orderSn
  }),
}));

export default useCart;
