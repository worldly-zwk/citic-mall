import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Index: undefined,
  Product: {
    id: string;
  },
}

export  type TabParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  Category: undefined;
  Cart: undefined;
  Member: undefined;
};

export type ProductScreenProps = NativeStackScreenProps<RootStackParamList, 'Product'>;

