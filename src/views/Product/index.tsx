import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, SafeAreaView } from 'react-native';
import { Typography, Form, Button, InputNumber, Popup, Radio } from '@/components';
import { useBoolean, useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import { useCart } from '@/store';
import { normNameToMap, normMapToName, toast } from '@/utils';
import { AddCartMode, OrderModel, ProductScreenProps } from '@/typings';
import Carousel from './components/Carousel';
import BasisCard from './components/BasisCard';
import GoodsCard from './components/GoodsCard';
import FeedbackCard from './components/FeedbackCard';
import StoreCard from './components/StoreCard';
import SuggestCard from './components/SuggestCard';
import Introduce from './components/Introduce';
import ToolBar from './components/Toolbar';

const FormItem = Form.Item;


const Product = ({ route, navigation }: ProductScreenProps) => {
  const { id } = route.params;
  const [count, setCount] = useState(1);
  const [mode, setMode] = useState<AddCartMode | null>(null);
  const [visible, setVisible] = useBoolean();
  const actions = useCart(state => ({
    add: state.add,
    check: state.check,
  }));

  const [state, { run }] = useRequest<API.ProductInfo>(`${PRODUCT.details}/${id}`);
  const [descState] = useRequest<string>(`${PRODUCT.description}/${id}`);
  const [activityState, { run: activityRun }] = useRequest<API.ProductPromotion[]>(`${PRODUCT.activity}/${id}`, {
    manual: true,
  });
  const [ticketState, { run: ticketRun }] = useRequest<API.ProductPromotion[]>(`${PRODUCT.ticket}/${id}`, {
    manual: true,
  });

  const services = useMemo(() => {
    if (state.data?.productServe) {
      return Object.entries(state.data.productServe).map(([title, desc]) => ({ title, desc }));
    }
    return [];
  }, [state.data?.productServe]);

  const norms = useMemo(() => {
    if (state.data?.normMap) {
      return Object.entries(state.data.normMap).map(([label, items]) => ({ label, items }));
    }
    return [];
  }, [state.data?.normMap]);

  const curGoodsInfo = useMemo(() => {
    return state.data?.productGoodsList?.find(({ isDefault }) => isDefault === 1);
  }, [state.data?.productGoodsList]);

  const curGoodsNormMap = useMemo(() => normNameToMap(curGoodsInfo?.normName), [curGoodsInfo]);

  const switchGoods = useCallback((name: string, value: string) => {
    curGoodsNormMap[name] = value;
    const normName = normMapToName(curGoodsNormMap);
    const info = state.data?.productGoodsList.find((goodsItem) => goodsItem.normName === normName);
    if (info?.id) {
      run({ productGoodsId: info.id });
    }
  }, [curGoodsNormMap, state.data?.productGoodsList]);

  const handleOpenPopup = useCallback((mode: AddCartMode) => {
    setMode(mode);
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setMode(null);
    setVisible(false);
  }, []);

  const handleAddCart = useCallback(() => {
    actions.add({
      count,
      productId: id,
      productGoodsId: curGoodsInfo?.id as number,
      isBuyNow: AddCartMode.ADD,
    }).then(success => {
      if (success) {
        setVisible(false);
        toast('加入购物车成功');
      }
    });
  }, [curGoodsInfo, count]);

  const handleBuyNow = useCallback(async () => {
    const success = await actions.add({
      count,
      productId: id,
      productGoodsId: curGoodsInfo?.id as number,
      isBuyNow: AddCartMode.BUY,
    });

    if (success) {
      const check = await actions.check(OrderModel.ORDINARY);

      if (check.code === 1) {
        setVisible(false);
        navigation.navigate('Order');
      }
    }
  }, [curGoodsInfo, count]);

  const handleFinish = useCallback(() => {
    if (mode === AddCartMode.ADD) {
      return handleAddCart();
    }
    return handleBuyNow();
  }, [mode]);

  useEffect(() => {
    const productGoodsId = curGoodsInfo?.id;
    if (productGoodsId) {
      ticketRun({ productGoodsId });
      activityRun({ productGoodsId });
    }
  }, [curGoodsInfo?.id]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        <Carousel items={state.data?.productLeadPicList} />
        <BasisCard loading={state.loading} data={state.data} />
        <GoodsCard
          info={curGoodsInfo}
          coupons={ticketState.data}
          promotions={activityState.data}
          count={count}
          services={services}
          onClickNorm={() => setVisible(true)}
        />
        <FeedbackCard />
        <StoreCard loading={state.loading} data={state.data} />
        <SuggestCard data={state.data?.catalogRandomProList} />
        <Introduce data={state.data} richText={descState.data} />
        <View style={styles.bottomLine}>
          <Typography.Text size="small" color="disabled">已经到底了</Typography.Text>
        </View>
      </ScrollView>
      <ToolBar onSubmit={handleOpenPopup} />
      <Popup bodyStyle={{ padding: 0 }} visible={visible} onClose={handleClose}>
        <View style={styles.norm}>
          <Image style={styles.normImage} source={{ uri: curGoodsInfo?.images }} />
          <View>
            <View style={styles.normPrice}>
              <Typography.Text primary size="small" strong>¥</Typography.Text>
              <Typography.Title primary>{curGoodsInfo?.mallPcPrice}</Typography.Title>
            </View>
            <Typography.Text size="small" color="disabled">库存{curGoodsInfo?.productStock}件</Typography.Text>
          </View>
        </View>
        <ScrollView style={styles.form}>
          <Form
            colon={false}
          >
            {norms.map(({ label, items }, index) => (
              <FormItem
                key={index}
                label={label}
                style={styles.formItem}
                labelTextStyle={styles.formLabel}
              >
                <Radio.Group
                  buttonRound
                  optionType="button"
                  options={items}
                  value={curGoodsNormMap[label]}
                  onChange={value => switchGoods(label, value as string)}
                />
              </FormItem>
            ))}
            <FormItem
              label="购买数量"
              layout="horizontal"
              labelTextStyle={styles.formLabel}
              contentStyle={styles.number}
            >
              <InputNumber value={count} onChange={setCount} />
            </FormItem>
          </Form>
        </ScrollView>
        {mode === null ? (
          <Button.Group style={{ height: 49 }}>
            <Button onPress={handleAddCart}>加入购物车</Button>
            <Button linearGradient={{ colors: ['#ff680d', '#e65321'] }} onPress={handleBuyNow}>立即购买</Button>
          </Button.Group>
        ) : (
          <View style={{ padding: 4 }}>
            <Button linearGradient={{ colors: ['#ff680d', '#e65321'] }} onPress={handleFinish}>确定</Button>
          </View>
        )}
      </Popup>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  norm: {
    height: 96,
    paddingHorizontal: 12,
    backgroundColor: '#f5f6fa',
    flexDirection: 'row',
    columnGap: 12,
  },
  normImage: {
    width: 130,
    height: 130,
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 6,
    marginTop: -50,
    backgroundColor: '#fff'
  },
  normPrice: {
    flexDirection: 'row',
    marginTop: 36,
    paddingVertical: 3,
    alignItems: 'center',
  },
  form: {
    padding: 12,
    minHeight: 138,
    maxHeight: 371,
  },
  formItem: {
    marginBottom: 0,
    paddingBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  number: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  formLabel: {
    fontSize: 16,
  },
  bottomLine: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Product;
