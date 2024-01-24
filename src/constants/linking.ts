import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '@/typings';

export const LINKING: LinkingOptions<RootStackParamList> = {
  prefixes: ['citicmall://', 'https://*.citic-mall.com'],
  config: {
    screens: {
      Product: 'pages/item/product/index'
    }
  },
};

export default LINKING;