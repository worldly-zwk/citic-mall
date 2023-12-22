export interface ProductItem {
  id: string;
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
