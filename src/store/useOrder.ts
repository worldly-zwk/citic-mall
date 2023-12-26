import { create } from 'zustand';
import { ORDER } from '@/services';
import request from '@/utils/request';
import { OrderModel } from '@/typings';

interface OrderStore {
  tips: boolean;
  order: null | API.Order;
  init: (model: OrderModel) => Promise<API.Order>;
  setAddress: (address: API.Address) => void;
}

function hasNotSupportSevenBack(sellers: API.OrderSeller[]) {
  for (const seller of sellers) {
    for (const info of seller.productList) {
      if (info.isSevenBack === 0) {
        return true;
      }
    }
  }
  return false;
}

const useOrder = create<OrderStore>((set) => ({
  tips: false,
  order: null,
  init: async (orderModel: OrderModel) => {
    const order = await request.post<API.Order>(ORDER.init, { orderModel });
    set({ order, tips: hasNotSupportSevenBack(order.productVOList) });
    return order;
  },
  setAddress: (address: API.Address) => {

  }
}));

export default useOrder;
