import { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export enum SearchTypeEnum {
  PRODUCT,
  SELLER,
}

export type RootStackParamList = {
  Index: NavigatorScreenParams<RootTabParamList>,
  Product: {
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
  Agreement: {
    id: number;
  };
  Wallet: {
    tab: number;
  };
  Collection: {
    tab: number;
  },
  History: undefined;
  AfterSales: undefined;
  Contact: undefined;
  ContactForm: undefined;
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
export type SearchListScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchList'>;
export type CategoryTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'CategoryTabs'>;
export type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Index'>;
export type SMSCodeScreenProps = NativeStackScreenProps<LoginStackParamList, 'SMSCode'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export type OrderScreenProps = NativeStackScreenProps<RootStackParamList, 'Order'>;
export type OrderTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderTabs'>;
export type OrderDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderDetails'>;
export type ProfileInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileInfo'>;
export type NicknameScreenProps = NativeStackScreenProps<RootStackParamList, 'Nickname'>;
export type StaffScreenProps = NativeStackScreenProps<RootStackParamList, 'Staff'>;
export type StaffAuthScreenProps = NativeStackScreenProps<RootStackParamList, 'StaffAuth'>;
export type AddressScreenProps = NativeStackScreenProps<RootStackParamList, 'Address'>;
export type AddressFormScreenProps = NativeStackScreenProps<RootStackParamList, 'AddressForm'>;
export type RealNameAuthScreenProps = NativeStackScreenProps<RootStackParamList, 'RealNameAuth'>;
export type RealNameAuthFormScreenProps = NativeStackScreenProps<RootStackParamList, 'RealNameAuthForm'>;
export type AgreementScreenProps = NativeStackScreenProps<RootStackParamList, 'Agreement'>;
export type WalletScreenProps = NativeStackScreenProps<RootStackParamList, 'Wallet'>;
export type CollectionScreenProps = NativeStackScreenProps<RootStackParamList, 'Collection'>;
export type HistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'History'>;
export type AfterSalesScreenProps = NativeStackScreenProps<RootStackParamList, 'AfterSales'>;
export type ContactScreenProps = NativeStackScreenProps<RootStackParamList, 'Contact'>;
export type ContactFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ContactForm'>;

