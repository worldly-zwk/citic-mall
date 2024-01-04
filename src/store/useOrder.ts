import { create } from 'zustand';
import { ORDER } from '@/services';
import request from '@/utils/request';
import { OrderModel } from '@/typings';

interface OrderStore {
  tips: boolean;
  order: null | API.OrderInit;
  orderModel: OrderModel;
  init: (model: OrderModel, data?: Omit<API.OrderInitParams, 'orderModel'>) => Promise<API.OrderInit>;
  update: (data: Omit<API.OrderInitParams, 'orderModel'>) => void;
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

const useOrder = create<OrderStore>((set, get) => ({
  tips: false,
  order: null,
  orderModel: OrderModel.ORDINARY,
  init: async (orderModel, data = {}) => {
    const order = await request.post<API.OrderInit>(ORDER.init, { orderModel, ...data });
    set({ order, tips: hasNotSupportSevenBack(order.productVOList), orderModel });
    return order;
  },
  update: data => get().init(get().orderModel, data)
}));

export default useOrder;
