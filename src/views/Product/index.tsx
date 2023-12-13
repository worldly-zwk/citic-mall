import { useMemo, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, SafeAreaView } from 'react-native';
import { useBoolean, useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import Typography from '@/components/Typography';
import { ProductScreenProps } from '@/typings/screen';
import Carousel from './components/Carousel';
import BasisCard from './components/BasisCard';
import GoodsCard from './components/GoodsCard';
import FeedbackCard from './components/FeedbackCard';
import StoreCard from './components/StoreCard';
import SuggestCard from './components/SuggestCard';
import Introduce from './components/Introduce';
import ToolBar from './components/Toolbar';
import Popup from '@/components/Popup';
import FormItem from '@/components/FormItem';
import RadioButton from '@/components/RadioButton';
import InputNumber from '@/components/InputNumber';
import Button from '@/components/Button';

const Product = ({ route }: ProductScreenProps) => {
  const { id } = route.params;
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useBoolean();

  const [state] = useRequest<API.ProductInfo>(`${PRODUCT.details}/${id}`);
  const [descState] = useRequest<string>(`${PRODUCT.description}/${id}`);

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
  }, [state.data?.productServe]);

  const curGoodsInfo = useMemo(() => {
    return state.data?.productGoodsList?.find(({ isDefault }) => isDefault === 1);
  }, [state.data?.productGoodsList]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main}>
        <Carousel items={state.data?.productLeadPicList} />
        <BasisCard data={state.data} />
        <GoodsCard info={curGoodsInfo} count={count} services={services} onClickNorm={() => setVisible(true)} />
        <FeedbackCard />
        <StoreCard data={state.data} />
        <SuggestCard data={state.data?.catalogRandomProList} />
        <Introduce data={state.data} richText={descState.data} />
        <View style={styles.bottomLine}>
          <Typography.Text size="small" type="disabled">已经到底了</Typography.Text>
        </View>
      </ScrollView>
      <ToolBar onSubmit={() => setVisible(true)} />
      <Popup bodyStyle={{ padding: 0 }} visible={visible} onClose={setVisible}>
        <View style={styles.norm}>
          <Image style={styles.normImage} source={{ uri: curGoodsInfo?.images }} />
          <View>
            <View style={styles.normPrice}>
              <Typography.Text primary size="small" strong>¥</Typography.Text>
              <Typography.Title primary>{curGoodsInfo?.mallPcPrice}</Typography.Title>
            </View>
            <Typography.Text size="small" type="disabled">库存{curGoodsInfo?.productStock}件</Typography.Text>
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
        <Button.Group style={{ height: 49 }}>
          <Button>加入购物车</Button>
          <Button color={['#ff680d', '#e65321']}>立即购买</Button>
        </Button.Group>
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
    marginTop: -50
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
