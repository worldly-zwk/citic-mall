import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SearchTypeEnum {
  PRODUCT,
  SELLER,
}

export type RootStackParamList = {
  Index: NavigatorScreenParams<RootTabParamList>,
  Product: {
    id: string;
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

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;
export type CategoryScreenProps = NativeStackScreenProps<RootStackParamList>;
export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
export type ProductScreenProps = NativeStackScreenProps<RootStackParamList, 'Product'>;
export type SearchListScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchList'>;
export type CategoryTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'CategoryTabs'>;
export type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Index'>;
export type SMSCodeScreenProps = NativeStackScreenProps<LoginStackParamList, 'SMSCode'>;

