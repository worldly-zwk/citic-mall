import { CollectionTab, NoticeTab, WalletTab } from "@/typings";

export const AUTH_RULES = [
  '根据海关规定，购买跨境商品需进行实名认证，用于个人物品入境申报。为确保您购买的商品能够顺利办理清关手续，请配合提供实名信息，并确保订购人（注册人）实名信息与您微信支付的实名信息保持一致，否则将无法正常发货哦。',
  '实名认证必须要上传身份证照片吗？\n根据海关要求，购买跨境商品时需提供订购人（注册人）实名的真实姓名及身份证号码，部分商品下单时需提供收货人的实名信息（含身份证照片），中信易家会对您的个人信息做加密处理，不做他途使用，其他任何人均无法查看。'
];

export const ORDER_TABS = [
  {
    title: '全部',
    value: 0,
  },
  {
    title: '待付款',
    value: 1,
  },
  {
    title: '待发货',
    value: 2,
  },
  {
    title: '待收货',
    value: 3,
  },
  {
    title: '待评价',
    value: 4,
  },
];

export const WALLET_TABS = [
  {
    title: '红包',
    value: WalletTab.RED_ENVELOPE,
  },
  {
    title: '优惠券',
    value: WalletTab.COUPON,
  },
  {
    title: '其他',
    value: WalletTab.OTHER
  },
];

export const COLLECTION_TABS = [
  {
    title: '商品',
    value: CollectionTab.PRODUCT,
  },
  {
    title: '店铺',
    value: CollectionTab.SELLER,
  },
];

export const NOTIFICATION_TABS = [
  {
    title: '活动通知',
    value: NoticeTab.ACTIVITY,
  },
  {
    title: '系统通知',
    value: NoticeTab.SYSTEM,
  },
  {
    title: '平台公告',
    value: NoticeTab.PLATFORM,
  },
];
