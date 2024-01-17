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

export enum CollectionTab {
  PRODUCT,
  SELLER,
}

/**
   * 发票属性
   * 0 普通发票
   * 1 电子发票
   */
export enum InvoiceProperty {
  ORDINARY,
  ELECTRONIC,
}

/**
 * 发票类型
 * 0 不开发票
 * 1 个人发票
 * 2 单位发票
 * 3 增值专票
 */
export enum InvoiceType {
  NONE,
  PERSONAL,
  COMPANY,
  VALUE_ADDED
}

export enum NoticeTab {
  ACTIVITY,
  SYSTEM,
  PLATFORM
}
