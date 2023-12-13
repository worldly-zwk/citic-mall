interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface SideBar {
  key: string | number;
  title: string;
  value: string | number;
  children?: React.ReactElement;
  [key: string]: any;
}
