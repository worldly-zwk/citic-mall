export * from './screen';

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface SideBar {
  key: string | number;
  title: string;
  value: string | number;
  children?: React.ReactElement;
  [key: string]: any;
}

export enum LoginTypeEnum {
  CODE = 1,
  PASSWORD = 2,
}

export enum OrderModel {
  ORDINARY = 'ordinary',
}

export enum OrderStatus {
  ALL,
  PAYMENT,
  SHIPMENT,
  DELIVERY,
  REVIEW,
  DONE
}

export enum AddCartMode {
  ADD,
  BUY,
}

export enum MemberGender {
  NONE,
  MALE,
  FEMALE,
}

export enum WalletTab {
  RED_ENVELOPE,
  COUPON,
  OTHER
}
