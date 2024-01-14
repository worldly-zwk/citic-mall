import { create } from 'zustand';
import { ORDER } from '@/services';
import request from '@/utils/request';
import { OrderModel } from '@/typings';

interface OrderStore {
  tips: boolean;
  order: null | API.OrderInit;
  invoice: API.Invoice;
  orderModel: OrderModel;
  init: (model: OrderModel, data?: Omit<API.OrderInitParams, 'orderModel'>, init?: boolean) => Promise<API.OrderInit>;
  update: (data: Omit<API.OrderInitParams, 'orderModel'>) => void;
  setInvoice: (invoice: API.Invoice) => void;
  finish: (data: Pick<API.OrderCommitParams, 'memberNotes'>) => Promise<API.OrderCommit>;
}

const initialInvoice = {
  type: 0,
  content: '不开发票',
};

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
  invoice: initialInvoice,
  orderModel: OrderModel.ORDINARY,
  init: async (orderModel, data = {}, init = true) => {
    const order = await request.post<API.OrderInit>(ORDER.init, { orderModel, ...data });
    set({ order, tips: hasNotSupportSevenBack(order.productVOList), orderModel });
    if (init) {
      set({ invoice: initialInvoice });
    }
    return order;
  },
  update: data => get().init(get().orderModel, data, false),
  setInvoice: (invoice: API.Invoice) => {
    set({ invoice });
  },
  finish: (values) => {
    const { order, orderModel, invoice } = get();
    const addressId = order?.addressVO?.id;
    const moneyPay = order?.moneyPay;
    return request.post<API.OrderCommit>(ORDER.commit, {
      moneyPay,
      addressId,
      orderModel,
      invoice,
      ...values,
    })
  }
}));

export default useOrder;
