declare namespace API {
  interface Home {
    banners: Banner[];
    channels: HomeChannel[];
    floorBlockName: string;
    floorBlockViceName: string;
    floors: Floor[];
    msgIndexList: any[];
    productList: Product[];
    templatesUnder: any[];
    templatesUp: any[];
  }

  interface Banner {
    title: string;
    image: string;
    linkUrl: string;
    linkType: number;
  }

  interface HomeChannel {
    title: string;
    titleColor: string;
    image: string;
    linkType: number;
    linkUrl: string;
    displayRule: number;
  }

  interface Floor {
    id: string;
    name: string;
    type: number;
    color: string;
    dataList: {
      title: string;
      image: string;
      linkUrl: string;
      dataType: number;
      mindexFloorName: string;
      product: Product;
      productName: string;
    }[];
    advImage: string;
    advJson: string;
    advLinkType: number;
    advLinkUrl: string;
    moreLinkType: number;
    moreLinkUrl: string;
    mIndexFloorAdvList: AdvInfo[];
  }

  interface Product {
    id: string;
    name1: string;
    name2: string;
    masterImg: string;
    mallPcPrice: number;
    marketPrice: number;
    productType: number;
    productStock: number;
    productGoodsId: number;
    productBrandName: string;
    productLeadPicList: string[];
    productGoodsList: ProductGoods[];
    productServe: Record<string, string>;
    productStock: number;
    nationalFlag?: string;
    normMap: Record<string, string[]>;
    countryId?: string;
    countryName?: string;
    state: number;
    isSelf: number;
    isDelete: number;
  }

  interface ProductGoods {
    id: number;
    images: string;
    isDefault: number;
    mallPcPrice: number;
    marketPrice: number;
    normName: string;
    orderLimitMax: number;
    orderLimitMin: number;
    productStock: number;
    skuCode: string;
  }

  interface ProductInfo extends Product {
    catalogRandomProList: Product[];
    sellerId: number;
    sellerLogo: string;
    sellerName: string;
    sellerNotice: string;
  }

  interface AdvInfo {
    advImage: string;
    advLinkUrl: string;
    advLinkType: number;
  }

  interface MemberRecommend {
    count: number;
    heardTitle: string;
    productList: Product[];
  }

  interface Catalog {
    id: string;
    name: string;
    catalogAdvList: any[];
    productCatalogVOList: CatalogProduct[];
  }

  interface CatalogProduct {
    id: number;
    name: string;
    image: string;
    productCatalogVOList: Omit<CatalogProduct, 'productCatalogVOList'>[];
  }
}