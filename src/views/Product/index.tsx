import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, SafeAreaView, Alert } from 'react-native';
import { isWXAppInstalled } from 'react-native-wechat';
import { Typography, Form, Button, InputNumber, Popup, Radio, Link, Icon } from '@/components';
import { useBoolean } from '@/hooks';
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
import Tabs from './components/Tabs';
import useProduct from './useProduct';

const FormItem = Form.Item;


const Product = ({ route, navigation }: ProductScreenProps) => {
  const { id } = route.params;
  const [count, setCount] = useState(1);
  const [mode, setMode] = useState<AddCartMode | null>(null);
  const [visible, normActions] = useBoolean();
  const [state, actions] = useProduct(id);
  const cartActions = useCart(state => ({
    add: state.add,
    check: state.check,
  }));

  const services = useMemo(() => {
    if (state.info?.productServe) {
      return Object.entries(state.info.productServe).map(([title, desc]) => ({ title, desc }));
    }
    return [];
  }, [state.info?.productServe]);

  const norms = useMemo(() => {
    if (state.info?.normMap) {
      return Object.entries(state.info.normMap).map(([label, items]) => ({ label, items }));
    }
    return [];
  }, [state.info?.normMap]);

  const curGoodsNormMap = useMemo(() => normNameToMap(state.curGoodsInfo?.normName), [state.curGoodsInfo]);

  const switchGoods = useCallback((name: string, value: string) => {
    curGoodsNormMap[name] = value;
    const normName = normMapToName(curGoodsNormMap);
    const info = state.info?.productGoodsList.find((goodsItem) => goodsItem.normName === normName);
    if (info?.id) {
      actions.reload({ productGoodsId: info.id });
    }
  }, [curGoodsNormMap, state.info?.productGoodsList]);

  const handleOpenPopup = useCallback((mode: AddCartMode) => {
    setMode(mode);
    normActions.setTrue();
  }, []);

  const handleClose = useCallback(() => {
    setMode(null);
    normActions.setFalse();
  }, []);

  const handleAddCart = useCallback(() => {
    cartActions.add({
      count,
      productId: id,
      productGoodsId: state.curGoodsInfo?.id as number,
      isBuyNow: AddCartMode.ADD,
    }).then(success => {
      if (success) {
        normActions.setFalse();
        toast('加入购物车成功');
      }
    });
  }, [state.curGoodsInfo, count]);

  const handleBuyNow = useCallback(async () => {
    const success = await cartActions.add({
      count,
      productId: id,
      productGoodsId: state.curGoodsInfo?.id as number,
      isBuyNow: AddCartMode.BUY,
    });

    if (success) {
      const check = await cartActions.check(OrderModel.ORDINARY);

      if (check.code === 1) {
        normActions.setFalse();
        navigation.navigate('Order');
      }
    }
  }, [state.curGoodsInfo, count]);

  const handleFinish = useCallback(() => {
    if (mode === AddCartMode.ADD) {
      return handleAddCart();
    }
    return handleBuyNow();
  }, [mode, handleAddCart]);

  useEffect(() => {
    // console.log(wechat)
    isWXAppInstalled().then(value => Alert.alert(String(value)));
    navigation.setOptions({
      headerTitle: () => <Tabs />,
      headerRight: () => {
        return (
          <Link>
            <Icon size={24} icon="more" />
          </Link>
        )
      }
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        <Carousel items={state.info?.productLeadPicList} />
        <BasisCard loading={state.loading} data={state.info} />
        <GoodsCard
          info={state.curGoodsInfo}
          coupons={state.ticket}
          promotions={state.activity}
          count={count}
          services={services}
          onClickNorm={normActions.setTrue}
        />
        <FeedbackCard id={id} data={state.comment} />
        <StoreCard loading={state.loading} data={state.info} />
        <SuggestCard data={state.info?.catalogRandomProList} />
        <Introduce data={state.info} richText={state.richText} />
        <View style={styles.bottomLine}>
          <Typography.Text size="small" color="disabled">已经到底了</Typography.Text>
        </View>
      </ScrollView>
      <ToolBar data={state.info} collection={state.collection} onCollection={actions.collection} onSubmit={handleOpenPopup} />
      <Popup bodyStyle={{ padding: 0 }} visible={visible} onClose={handleClose}>
        <View style={styles.norm}>
          <Image style={styles.normImage} source={{ uri: state.curGoodsInfo?.images }} />
          <View style={styles.normContent}>
            <Typography.Price>{state.curGoodsInfo?.mallPcPrice}</Typography.Price>
            <Typography.Text size="small" color="disabled">库存{state.curGoodsInfo?.productStock}件</Typography.Text>
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
  normContent: {
    paddingTop: 36,
    rowGap: 8,
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
