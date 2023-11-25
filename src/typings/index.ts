interface ProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface SideBar {
  key: string | number;
  title: string;
  children?: React.ReactElement;
}
