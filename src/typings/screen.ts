import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Index: undefined,
  Product: {
    id: string;
  },
  CategoryTabs: {
    id: string;
  },
  Search: undefined;
}

export  type TabParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  Category: NavigatorScreenParams<RootStackParamList>;
  Cart: NavigatorScreenParams<RootStackParamList>;
  Member: NavigatorScreenParams<RootStackParamList>;
};
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;
export type CategoryScreenProps = NativeStackScreenProps<RootStackParamList>;
export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
export type ProductScreenProps = NativeStackScreenProps<RootStackParamList, 'Product'>;
export type CategoryTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'CategoryTabs'>;

