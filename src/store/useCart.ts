import { create } from 'zustand';
import { Alert } from '@/components';
import { ORDER } from '@/services';
import { request, toast } from '@/utils';
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
    const destroy = Alert.loading();
    return request.post<boolean, API.AddCartParams>(ORDER.cartAdd, data).finally(destroy);
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
    const destroy = Alert.loading();
    const check = await request.post<API.OrderCheck>(ORDER.check, {
      orderModel: mode
    });
    if (check.code === 1) {
      await useOrder.getState().init(mode);
      destroy();
      return check;
    }
    destroy();
    toast(check.message);
    return check;
  },
  again: (orderSn: string) => {
    const destroy = Alert.loading();
    return request.get<boolean>(ORDER.again, {
      orderSn
    }).finally(destroy);
  },
}));

export default useCart;
