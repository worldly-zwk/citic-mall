import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, SafeAreaView } from 'react-native';
import Popup from '@/components/Popup';
import FormItem from '@/components/FormItem';
import RadioButton from '@/components/RadioButton';
import InputNumber from '@/components/InputNumber';
import Button from '@/components/Button';
import { useBoolean, useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import Typography from '@/components/Typography';
import { ProductScreenProps } from '@/typings/screen';
import { useCart } from '@/store';
import { AddCartMode, OrderModel } from '@/typings';
import Carousel from './components/Carousel';
import BasisCard from './components/BasisCard';
import GoodsCard from './components/GoodsCard';
import FeedbackCard from './components/FeedbackCard';
import StoreCard from './components/StoreCard';
import SuggestCard from './components/SuggestCard';
import Introduce from './components/Introduce';
import ToolBar from './components/Toolbar';


const Product = ({ route, navigation }: ProductScreenProps) => {
  const { id } = route.params;
  const [count, setCount] = useState(1);
  const [mode, setMode] = useState<AddCartMode | null>(null);
  const [visible, setVisible] = useBoolean();
  const actions = useCart(state => ({
    add: state.add,
    check: state.check,
  }));

  const [state] = useRequest<API.ProductInfo>(`${PRODUCT.details}/${id}`);
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
        <BasisCard data={state.data} />
        <GoodsCard
          info={curGoodsInfo}
          coupons={ticketState.data}
          promotions={activityState.data}
          count={count}
          services={services}
          onClickNorm={() => setVisible(true)}
        />
        <FeedbackCard />
        <StoreCard data={state.data} />
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
          {norms.map(({ label, items }) => (
            <FormItem label={label} key={label}>
              <RadioButton options={items} />
            </FormItem>
          ))}
          <FormItem label="购买数量" layout="horizontal" contentStyle={styles.number}>
            <InputNumber value={count} onChange={setCount} />
          </FormItem>
        </ScrollView>
        {mode === null ? (
          <Button.Group style={{ height: 49 }}>
            <Button onPress={handleAddCart}>加入购物车</Button>
            <Button color={['#ff680d', '#e65321']} onPress={handleBuyNow}>立即购买</Button>
          </Button.Group>
        ) : (
          <View style={{ padding: 4 }}>
            <Button color={['#ff680d', '#e65321']} onPress={handleFinish}>确定</Button>
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
  number: {
    justifyContent: 'flex-end',
  },
  bottomLine: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Product;
