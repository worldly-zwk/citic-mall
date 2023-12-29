declare namespace API {
  interface BasePageResponse<T> {
    count: number;
    data: T[];
  }

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

  interface Store {
    id: number;
    sellerName: string;
    sellerLogo: string;
    productNumber: number;
    isSelf: string;
    isOverseas: string;
    productList: Product[];
  }

  interface Product {
    id: number;
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
    productAttrList: ProductAttr[];
    promotionLabelList?: string[];
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

  interface ProductPromotion {
    id: number;
    type: number;
    title: string;
    slogan: string;
    newMemberLabel: string;
    detailedInformation: string;
  }

  interface ProductAttr {
    id: number;
    name: string;
    value: string;
    state: number;
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

  type LigthCatalog = Pick<Catalog, 'id' | 'name'>;

  interface Catalog {
    id: string;
    name: string;
    catalogAdvList: any[];
    productCatalogVOList: CatalogProduct[];
  }

  interface CatalogProduct {
    id: string;
    name: string;
    image: string;
    productCatalogVOList: Omit<CatalogProduct, 'productCatalogVOList'>[];
  }

  interface CatalogProductList {
    count: number;
    heardTitle: string;
    productList: Product[];
  }

  interface SearchKeyword {
    id: number;
    keyword: string;
    linkType: number;
    linkUrl: string;
  }

  interface Member {
    authStaff: number;
    gender: number;
    headPortrait: string;
    name: string;
    nickname: string;
    trueName: string;
  }

  interface Cart {
    disMoney: number;
    moneyPay: number;
    selected: boolean;
    selectedCount: boolean;
    sellerCartList: SellerCart[];
    totalCheckedNmber: number;
    abroadSelectedCount: number;
  }

  interface SellerCart {
    sellerId: number;
    sellerName: string;
    selected: boolean;
    coupon: boolean;
    ordinaryCart: {
      productList: ProductCart[];
    };
  }

  interface ProductCart {
    cartId: number;
    image: string;
    money: number;
    state: number;
    number: number;
    minimal: number;
    maximum: number;
    abroad: boolean;
    selected: boolean;
    specification: string;
    productId: number;
    productName: string;
    productStock: number;
    productGoodsId: number;
  }

  interface AddCartParams {
    count: number;
    isBuyNow: number;
    productId: number;
    productGoodsId: number;
  }

  interface Address {
    id: number;
    state: number;
    addAll: string;
    addressInfo: string;
    memberName: string;
    mobile: string;
    regionsVersion: string;
  }

  interface Order {
    addressVO?: Address;
    couponPlatformVOS: any[];
    crossBorderModel: number;
    einvoice: number;
    flashDis: number;
    fullDis: number;
    invoice: number;
    message: string;
    mgmIntegral: number;
    moneyLogistics: number;
    moneyPay: number;
    moneyProduct: number;
    orderModel: string;
    performerList: any[];
    productVOList: OrderSeller[];
    singleDis: number;
    staffDis: number;
    status: number;
    vatInvoice: number;
    virutalOrderModel: number;
  }

  interface OrderSeller {
    sellerId: number;
    sellerName: string;
    productList: OrderProduct[];
  }

  interface OrderProduct {
    isGift: number;
    isSevenBack: number;
    message: string;
    moneyPrice: number;
    number: number;
    pid: number;
    priceId: string;
    productGoodsId: number;
    productId: number;
    productMasterImage: string;
    productName: string;
    specInfo: string;
    status: number;
  }

  interface OrderCheck {
    code: number;
    message: string;
  }

  interface OrderInitParams {
    orderModel: string;
    addressId?: number;
  }

  interface Agreement {
    id: number;
    typeId: number;
    typePath: string;
    title: string;
    content: string;
    author: string;
    isRecommend: number;
    createTime: string;
  }
}