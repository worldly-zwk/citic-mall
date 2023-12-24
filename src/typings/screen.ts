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

