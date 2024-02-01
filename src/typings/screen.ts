import { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export enum SearchTypeEnum {
  PRODUCT,
  SELLER,
}

export type RootStackParamList = {
  Index: NavigatorScreenParams<RootTabParamList>,
  Cart: undefined,
  Product: {
    id: number;
  },
  ProductComment: {
    id: number;
  },
  CategoryTabs: {
    id: string;
  },
  Search: undefined;
  SearchList: {
    keyword: string;
    type: SearchTypeEnum;
  };
  Login: NavigatorScreenParams<LoginStackParamList>;
  Settings: undefined;
  Order: undefined;
  OrderTabs: {
    tab: number;
  } | undefined,
  OrderDetails: {
    id: string;
  },
  OrderInvoice: undefined,
  OrderCoupon: undefined,
  OrderPayment: {
    orderSn: string;
  },
  ProfileInfo: undefined;
  Nickname: {
    name?: string;
  };
  Staff: undefined;
  StaffAuth: undefined;
  StaffAuthEmail: undefined;
  StaffAuthMail: undefined;
  StaffAuthPhone: undefined;
  Address?: {
    source: 'Order';
  };
  AddressForm?: {
    id?: number;
    source?: 'Order';
    address?: API.Address;
  },
  RealNameAuth: undefined;
  RealNameAuthForm: undefined;
  Security: undefined;
  SecurityEmail: undefined;
  SecurityPhone: undefined;
  SecurityPassword: undefined;
  Agreement: {
    id: number;
  };
  Wallet: {
    tab: number;
  };
  CouponList: undefined;
  RedEnvelopeList: undefined;
  Collection: {
    tab: number;
  },
  History: undefined;
  AfterSales: undefined;
  Contact: undefined;
  ContactForm: undefined;
  Notice: undefined;
  NoticeDetails: {
    id: number;
  };
  Store: {
    id: number;
  };
}

export  type RootTabParamList = {
  Home: undefined;
  Category: undefined;
  Cart: undefined;
  Member: undefined;
};

export  type LoginStackParamList = {
  Index: undefined;
  SMSCode: {
    phone: string;
    session: string;
  };
};


export type IndexScreenProps = NativeStackScreenProps<RootStackParamList, 'Index'>;
export type HomeScreenProps = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Home'>, IndexScreenProps>;
export type CategoryScreenProps = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Category'>, IndexScreenProps>;
export type CartScreenProps = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Cart'>, IndexScreenProps>;
export type MemberScreenProps = CompositeScreenProps<BottomTabScreenProps<RootTabParamList, 'Member'>, IndexScreenProps>;
export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
export type ProductScreenProps = NativeStackScreenProps<RootStackParamList, 'Product'>;
export type ProductCommentScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductComment'>;
export type SearchListScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchList'>;
export type CategoryTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'CategoryTabs'>;
export type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Index'>;
export type SMSCodeScreenProps = NativeStackScreenProps<LoginStackParamList, 'SMSCode'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export type OrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Order'>;
export type OrderTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderTabs'>;
export type OrderCouponScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderCoupon'>;
export type OrderDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;
export type OrderInvoiceScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderInvoice'>;
export type OrderPaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderPayment'>;
export type ProfileInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileInfo'>;
export type NicknameScreenProps = NativeStackScreenProps<RootStackParamList, 'Nickname'>;
export type StaffScreenProps = NativeStackScreenProps<RootStackParamList, 'Staff'>;
export type StaffAuthScreenProps = NativeStackScreenProps<RootStackParamList, 'StaffAuth'>;
export type AddressScreenProps = NativeStackScreenProps<RootStackParamList, 'Address'>;
export type AddressFormScreenProps = NativeStackScreenProps<RootStackParamList, 'AddressForm'>;
export type RealNameAuthScreenProps = NativeStackScreenProps<RootStackParamList, 'RealNameAuth'>;
export type RealNameAuthFormScreenProps = NativeStackScreenProps<RootStackParamList, 'RealNameAuthForm'>;
export type SecurityEmailScreenProps = NativeStackScreenProps<RootStackParamList, 'SecurityEmail'>;
export type AgreementScreenProps = NativeStackScreenProps<RootStackParamList, 'Agreement'>;
export type WalletScreenProps = NativeStackScreenProps<RootStackParamList, 'Wallet'>;
export type CouponListScreenProps = NativeStackScreenProps<RootStackParamList, 'CouponList'>;
export type RedEnvelopeListScreenProps = NativeStackScreenProps<RootStackParamList, 'RedEnvelopeList'>;
export type CollectionScreenProps = NativeStackScreenProps<RootStackParamList, 'Collection'>;
export type HistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'History'>;
export type AfterSalesScreenProps = NativeStackScreenProps<RootStackParamList, 'AfterSales'>;
export type ContactScreenProps = NativeStackScreenProps<RootStackParamList, 'Contact'>;
export type ContactFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ContactForm'>;
export type NoticeScreenProps = NativeStackScreenProps<RootStackParamList, 'Notice'>;
export type NoticeDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'NoticeDetails'>;
export type StoreScreenProps = NativeStackScreenProps<RootStackParamList, 'Store'>;

