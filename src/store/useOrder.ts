import { create, } from 'zustand';
import { ORDER } from '@/services';
import request from '@/utils/request';
import { OrderModel } from '@/typings';
import { Alert } from '@/components';

interface OrderStore {
  tips: boolean;
  order: API.OrderInit | null;
  moneyPay: number;
  coupon: OrderCoupon;
  invoice: API.Invoice;
  orderModel: OrderModel;
  init: (model: OrderModel, data?: Omit<API.OrderInitParams, 'orderModel'>, init?: boolean) => Promise<API.OrderInit>;
  update: (data: Omit<API.OrderInitParams, 'orderModel'>) => void;
  setInvoice: (invoice: API.Invoice) => void;
  setCouponSn: (couponSn: string[]) => void;
  finish: (data: Pick<API.OrderCommitParams, 'memberNotes'>) => Promise<API.OrderCommit>;
}

interface OrderCoupon {
  items: API.OrderCoupon[];
  couponSn: string[];
  couponDis: number;
  usableCount: number;
}

const initialInvoice = {
  type: 0,
  property: 0,
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

function transferCoupon(orderSellerCoupon?: API.OrderSellerCoupon[]) {
  const ticketCheckedMap = new Map();
  const orderCoupon: OrderCoupon = {
    items: [],
    couponSn: [],
    couponDis: 0,
    usableCount: 0,
  };

  if (orderSellerCoupon?.length) {
    for (const seller of orderSellerCoupon) {
      for (const couponInfo of seller.orderCouponList) {
        orderCoupon.items.push(couponInfo);
        if (couponInfo.canUse === 1) {
          orderCoupon.usableCount++;
          if (couponInfo.sureIsChecked && !ticketCheckedMap.get(seller.sellerId)) {
            ticketCheckedMap.set(seller.sellerId, true);
            orderCoupon.couponDis += couponInfo.couponValue;
            orderCoupon.couponSn.push(couponInfo.couponSn);
          }
        }
      }
    }
  }

  return orderCoupon;
}

const useOrder = create<OrderStore>((set, get) => ({
  tips: false,
  order: null,
  moneyPay: 0,
  coupon: {
    items: [],
    couponSn: [],
    couponDis: 0,
    usableCount: 0,
  },
  invoice: initialInvoice,
  orderModel: OrderModel.ORDINARY,
  init: async (orderModel, data = {}, init = true) => {
    const order = await request.post<API.OrderInit>(ORDER.init, { orderModel, ...data });
    set({ order, tips: hasNotSupportSevenBack(order.productVOList), orderModel });
    if (init) {
      const coupon = transferCoupon(order.couponVOS);
      set({
        coupon,
        invoice: initialInvoice,
        moneyPay: order.moneyPay - coupon.couponDis,
      });
    }
    return order;
  },
  update: data => get().init(get().orderModel, data, false),
  setInvoice: (invoice: API.Invoice) => {
    set({ invoice });
  },
  setCouponSn: (couponSn: string[]) => {
    const { coupon, order } = get();
    const couponDis = coupon.items.reduce((total, ticket) => {
      if (couponSn.includes(ticket.couponSn)) {
        return total + Number(ticket.couponValue);
      }
      return total;
    }, 0);
    if (order) {
      set({
        moneyPay: order.moneyPay - couponDis,
        coupon: {
          ...get().coupon,
          couponSn,
          couponDis,
        }
      })
    }
  },
  finish: (values) => {
    const { order, orderModel, invoice, coupon, moneyPay } = get();
    const addressId = order?.addressVO?.id;
    const destroy = Alert.loading();
    return request.post<API.OrderCommit>(ORDER.commit, {
      moneyPay,
      addressId,
      orderModel,
      invoice,
      couponSn: coupon.couponSn,
      ...values,
    }).finally(destroy);
  }
}));

export default useOrder;
