declare namespace API {
  interface BasePageParams {
    pageSize?: number;
    pageIndex?: number;
  }

  interface BasePageResponse<T> {
    count: number;
    data: T[];
  }

  interface BasePageListResponse<T> {
    count: number;
    list: T[];
  }

  interface Home {
    banners: Banner[];
    channels: HomeChannel[];
    floorBlockName: string;
    floorBlockViceName: string;
    floors: Floor[];
    msgIndexList: HomeMessage[];
    productList: Product[];
    templatesUnder: any[];
    templatesUp: any[];
  }

  interface HomeMessage {
    title: string;
    type: string;
    startTime: string;
    appUrl: string;
    msgNoticeId: number;
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
    productList?: Product[];
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
    /**
     * 7 已下架
     */
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

  interface ProductComment {
    id: number;
    userId: number;
    userName: string;
    grade: number;
    content: string;
    createTime: string;
    productId: number;
    productGoodsId: number;
    sellerId: number;
    orderSn: string;
    ordersProductId: number;
    state: number;
    description: number;
    serviceAttitude: number;
    productSpeed: number;
    imageNum: number;
    optId: number;
    optName: string;
    optTime: string;
    optContent: string;
    channelCode: string;
    channelName: string;
    userHeadPortrait: string;
    imageList: string[];
  };

  interface ProductCommentParams extends BasePageParams {
    productId: number;
    imageNum?: number;
    grades?: string
  }

  interface ProductCommentResponse {
    allNum: number;
    existImgNum: number;
    goodNum: number;
    mediumNum: number;
    negativeNum: number;
    favorableRate: number;
    productComments: ProductComment[];
    count: number;
  };

  interface ProductInfo extends Product {
    crossBorder: boolean;
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

  interface MemberState {
    couponNum: number;
    couponPlatformNum: number;
    myPreNum: number;
    memberCollectionProductNum: number;
    unEvaluate: number;
    year: number;
    productLookLogNum: number;
    couponThirdNum: number;
    leyitongIntegral: number;
    unReceive: number;
    unDelivery: number;
    unPayment: number;
    memberAuthNum: number;
    memberCollectionSellerNum: number;
  };

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
    tags?: string[];
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
    id: number;
    orderSn: string;
    orderStatus: number;
    orderType: number;
    orderProperty: number;
    orderStatusName: string;
    payMoney: number;
    moneyOrder: number;
    sellerName: string;
    sellerId: number;
    productList: OrderProduct[];
    orderProductsNum: number;
    activityId: number;
    isPresale: number;
    isNew: number;
    presellStatus: number;
    buyAgain: boolean;
    displayLogistics: boolean;
    goToPay: boolean;
    confirmReceipt: boolean;
    evaluate: boolean;
    activityType: number;
    orderThirdType: number;
    canCancellationOrder: boolean;
    isCrossBorder: number;
    logistics: number;
  }

  interface OrderInit {
    addressVO?: Address;
    couponVOS?: OrderSellerCoupon[];
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
    productList: OrderInitProduct[];
  }

  interface OrderInitProduct {
    isGift: number;
    isSevenBack: number;
    sevenDays: number;
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

  interface OrderCoupon {
    canUse: number;
    useCouponValue: number;
    couponValue: number;
    couponSn: string;
    bindType: number;
    couponType: number;
    useStartTime: string;
    useEndTime: string;
    couponName: string;
    selected: number;
    sureIsChecked: boolean;
    minAmount: number;
    useScope: string;
  }
  
  interface OrderSellerCoupon {
    sellerId: number;
    orderCouponList: OrderCoupon[];
  }

  interface OrderProduct {
    id: number;
    image: string;
    productId: number;
    productGoodsId: number;
    productName: string;
    number: number;
    moneyAmount: number;
    isGift: number;
    specInfo: string;
    sevenDays: number;
  }

  interface Invoice {
    /**
     * 发票类型
     * 0 不开发票
     * 1 个人发票
     * 2 单位发票
     * 3 增值专票
     */
    type: number;
    bonusOrderFee?: number;
    bonusOrderAmount?: number;
    content: string;
    /**
     * 发票属性
     * 0 普通发票
     * 1 电子发票
     */
    property: number;
    title?: string;
    address?: string;
    telephone?: string;
    bankName?: string;
    bankCode?: string;
    code?: string;
    email?: string;
  }

  interface OrderCheck {
    code: number;
    message: string;
  }

  interface OrderInitParams {
    orderModel: string;
    addressId?: number;
  }

  interface OrderCommitParams {
    account: string;
    mobile: string;
    activityId: string;
    addressId: number;
    couponPlatformSn: string[];
    couponSn: string[];
    memberNotes: string;
    moneyPay: string;
    orderModel: string;
    performers: any[];
    productList: any[];
  }

  enum OrderPaidStatus {
    N,
    Y
  }

  interface OrderCommit {
    isPaid: OrderPaidStatus;
    goJumpPayfor: boolean;
    orderSn: string;
    orderSnList: string[];
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

  interface MemberAuth {
    id: number;
    memberId: number;
    memberName: string;
    type: number;
    idCardName: string;
    idCardNo: string;
    authResult: number;
    isDefault: number;
    isDelete: number;
    remark: string;
    createUserId: number;
    createUserName: string;
    createTime: string;
    updateUserId: number;
    updateUserName: string;
    updateTime: string;
  }

  interface OrderDetails {
    id: number;
    addressVo: Address;
    orderProductList: OrderInitProduct[];
    orderStatusStep: string;
    invoiceVo: {
      invoiceStatus: number;
      invoiceType: number;
      invoiceProperty: number;
      invoiceTitle: string;
      invoiceContent: string;
      invoiceEmail: string;
      identificationNumber: string;
      email: string;
      thumb: string;
      thumb: string;
      addr: string;
      phone: string;
      bank: string;
      bankNumber: string;
    };
    orderSn: string;
    orderStatus: number;
    orderStatusName: string;
    isAutoPickup: number;
    memberNotes: string;
    sellerVo: Omit<OrderSeller, 'productList'>;
    cashPayChannel: string;
    moneyProduct: number;
    payMoney: number;
    moneyOrder: number;
    staffDis: number;
    flashDis: number;
    fullDis: number;
    singleDis: number;
    couponDis: number;
    couponPlatformDis: number;
    moneyLogistics: number;
    bonusCode: string;
    bonusOrderFee: number;
    bonusOrderAmount: number;
    createTime: string;
    orderFinishTime: string;
    presellStatus: number;
    canBuyAgain: boolean;
    canDisplayLogistics: boolean;
    canGoToPay: boolean;
    canConfirmReceipt: boolean;
    canCancellationOrder: boolean;
    canReturnOrder: boolean;
    canReturnOrderInfo: boolean;
    evaluate: boolean;
    postsaleDetail: number;
    restTime: number;
    postSaleId: number;
    isCrossBorder: number;
    orderType: number;
    orderProperty: number;
    homecredit: boolean;
    cashTradeSn: string;
    orderThirdType: number;
    logistics: number;
    activityType: string;
  }

  interface Ticket {
    id: number;
    name: string;
    value: number;
    remark?: string;
    useScope: string;
    minAmount: number;
    ticketType: number;
    useStartTime: string;
    useEndTime: string;
    state: number;
  }

  interface CollectionProduct {
    id: number;
    productId: number;
    name1: string;
    masterImg: string;
    mallPcPrice: number;
    state: number;
    isDelete: number;
    productType: number;
  }

  interface CollectionStore extends Store {
    sellerId: number;
  }

  interface History {
    yesterdayList: Omit<CollectionProduct, 'id'>[];
    yesterday: string;
    earlierList: Omit<CollectionProduct, 'id'>[];
    today: string;
    todayList: Omit<CollectionProduct, 'id'>[];
  };

  interface Payment {
    order: {
      orderSn: string;
      bonusPayAmount: number;
      payMoney: number;
      restTime: number;
    };
    paymentList: {
      code: string;
      name: string;
      image: string;
    }[];
  }

  interface Message {
    id: number;
    title: string;
    content: string;
    memberId: number;
    memberName: string;
    pcUrl: string;
    h5Url: string;
    appUrl: string;
    imageType: number;
    image: string;
    /**
     * 1-订单状态提示，2-优惠券过期提示，3-商品售后提示
     */
    msgType: number;
    // 售后服务id
    refId: number;
    // 订单编号
    refSn: string;
    tmpType: number;
    isRead: number;
    readTime: string;
    isDelete: number;
    remark: string;
    createUserId: number;
    createUserName: string;
    createTime: string;
    updateUserId: number;
    updateUserName: string;
    updateTime: string;
    timeName: string;
    h5Image: string;
  }

  interface NoticeResponse {
    msgActivityNoReadCount: number;
    currentType: number;
    msgNoticeNoReadCount: number;
    member: Member;
    msgMemberNoReadCount: number;
    msgList: Message[];
    memberStart: number;
  }

  interface NoticeInfoResponse {
    title: string;
    timeName: string;
    content: string;
  }

  interface PromotionTicket {
    id: number;
    name: string;
    value: number;
    minAmount: number;
    useTimeScope: string;
    couponType: number;
    useScope: string;
    isReceive: number;
    isCurrency: number | null;
    bindType: number | null;
    memberReceivedNum: number;
    personLimitNum: number;
    totalLimitNum: number;
    receivedNum: number;
    sendStartTime: string;
    sellerId: number;
  }

  interface Seller {
    id: number;
    memberId: number;
    name: string;
    sellerName: string;
    sellerLogo: string;
    sellerType: number;
    isSelf: number;
    isOverseas: number;
    provinceId: number;
    cityId: number;
    areaId: number;
    addAll: string;
    refundStreetInfo: string;
    refundAddressAll: string;
    refundZipCode: string;
    refundName: string;
    sellerGrade: number;
    scoreService: string;
    scoreDeliverGoods: string;
    scoreDescription: string;
    productNumber: number;
    productSales: number;
    collectionNumber: number;
    saleMoney: number;
    orderCount: number;
    orderCountOver: number;
    sellerKeyword: string;
    sellerDes: string;
    auditStatus: number;
    status: number;
    frozenTime: string;
    isHide: number;
    auditOpinion: string;
    auditId: number;
    auditName: string;
    auditTime: string;
    createId: number;
    createName: string;
    createTime: string;
    updateId: number;
    updateName: string;
    updateTime: string;
    operationDockingMan: string;
    isCrossBorder: number;
    supplierType: number;
    extInfo: string;
  }
  
  interface SellerRecommend {
    id: number;
    sellerId: number;
    dataType: number;
    refId: number;
    title: string;
    image: string;
    linkUrl: string;
    orderNo: number;
    isDelete: number;
    remark: string;
    createUserId: number;
    createUserName: string;
    createTime: string;
    updateUserId: number;
    updateUserName: string;
    updateTime: string;
    deviceFlg: number;
    productName: string;
    product?: Product;
  }
  
  interface SellerSetting {
    id: number;
    sellerId: number;
    scalingType: number;
    scaling: number;
    isLongTerm: number;
    startTime: string;
    endTime: string;
    settlementType: number;
    createId: number;
    createName: string;
    createTime: string;
    updateId: number;
    updateName: string;
    updateTime: string;
    imGroupId: string;
    isOpenImRobot: number;
    imTitle: string;
    department: number;
  }
  
  interface MSellerIndex {
    id: number;
    sellerId: number;
    logo: string;
    backImage: string;
    customerService: string;
    phone: string;
    notice: string;
    detail: string;
    isDelete: number;
    remark: string;
    createUserId: number;
    createUserName: string;
    createTime: string;
    updateUserId: number;
    updateUserName: string;
    updateTime: string;
    sellerName: string;
    createSellerTime: string;
    brandNames: string[];
  }
  
  interface SellerFloor {
    id: number;
    sellerId: number;
    name: string;
    orderNo: number;
    status: number;
    remark: string;
    createUserId: number;
    createUserName: string;
    createTime: string;
    updateUserId: number;
    updateUserName: string;
    updateTime: string;
    deviceFlg: number;
    datas: SellerFloorData[];
    dataCount: number;
  }

  interface SellerFloorData {
    id: number;
    sellerId: number;
    indexFloorId: number;
    dataType: number;
    refId: number;
    title: string;
    image: string;
    linkUrl: string;
    orderNo: number;
    remark: string;
    createUserId: number;
    createUserName: string;
    createTime: string;
    updateUserId: number;
    updateUserName: string;
    updateTime: string;
    product: Product;
    productName: string;
    msellerIndexFloorName: string;
  }
  
  interface SellerCate {
    id: number;
    sellerId: number;
    pid: number;
    name: string;
    path: string;
    sort: number;
    createId: number;
    createTime: string;
    status: number;
    childs: SellerCate[];
  }

  interface SellerQualification {
    id: number;
    sellerId: number;
    qualificationName: string;
    startTime: string;
    endTime: string;
    qualificationImg: string;
    applyType: number;
    auditStatus: number;
    auditOpinion: string;
    lastAuditUserId: number;
    lastAuditUserName: string;
    lastAuditTime: string;
    isDelete: number;
    createUserId: number;
    createUserName: string;
    createTime: string;
    updateUserId: number;
    updateUserName: string;
    updateTime: string;
  }

  interface SellerNotice {
    id: number;
    sellerId: number;
    msgTitle: string;
    msgTip: string;
    msgContent: string;
    timeName: string;
  }
  
  interface SellerIndex {
    sellerInfo: Seller;
    bannerList: any[];
    recommendList: SellerRecommend[];
    sellerSetting: SellerSetting;
    sellerScoreAvg: number;
    productsCountAll: number;
    mSellerIndex: MSellerIndex;
    mSellerIndexFloorlist: SellerFloor[];
    cateList: SellerCate[];
    collectionSellerCount: number;
    collected: string;
    sellerId: number;
    isExistNotice: boolean;
    isExistBanner: boolean;
    isExistIndexFloor: boolean;
    license: string;
    permit: string;
    shareSellerUrl: string;
    customerServicehHref: string;
    mSellerQualificationList: SellerQualification[];
    sellerMsgNoticeList: SellerNotice[];
  }

  interface SellerPageResponse {
    isExistNotice: boolean;
    isExistBanner: boolean;
    isExistIndexFloor: boolean;
    pager: {
      pageIndex: number;
      pageSize: number;
      rowsCount: number;
      sortby: string;
      start: number;
    };
    sort: number;
  }

  interface SellerProductPageResponse extends SellerPageResponse {
    products: Product[];
  }

  interface SellerFloorPageResponse extends SellerPageResponse {
    floordatas: SellerFloorData[];
  }

  interface PayResult {
    state: number;
    message: string;
  }

  type UploadResponse = Record<'fileId' | 'filePath', string>;
}