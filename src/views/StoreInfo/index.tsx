import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Cell, Icon, Space, Typography } from '@/components';
import { StoreInfoScreenProps } from '@/typings';
import { useSeller } from '@/store';

const { Text } = Typography;
const CellGroup = Cell.Group;

const StoreInfo = ({ route }: StoreInfoScreenProps) => {
  const { id } = route.params;
  const state = useSeller(state => state.sellerInfo);
  const storeInit = useSeller(state => state.init);
  const { mSellerIndex, sellerInfo } = state || {};

  useEffect(() => {
    storeInit(id);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Space style={styles.meta} size={12}>
        <Image style={styles.avatar} source={{ uri: mSellerIndex?.logo || sellerInfo?.sellerLogo }} />
        <View style={styles.metaContent}>
          <Text size="large">{mSellerIndex?.sellerName || sellerInfo?.sellerName}</Text>
          <Text size="small" color="disabled">{state?.collectionSellerCount || 0}人关注</Text>
        </View>
      </Space>
      <View style={styles.main}>
        <CellGroup style={styles.group}>
          <Cell label="店铺介绍" style={styles.cell} contentStyle={styles.cellContent}>
            <Text size="small" color="secondary">{sellerInfo?.sellerDes}</Text>
          </Cell>
          <Cell label="开店时间" style={styles.cell} contentStyle={styles.cellContent}>
            <Text size="small" color="secondary">{sellerInfo?.createTime.slice(0, 10)}</Text>
          </Cell>
        </CellGroup>
        <CellGroup style={styles.group}>
          <Cell label="联系客服" style={styles.cell}>
            <Icon icon="customerServiceBlue" />
          </Cell>
          <Cell label="店铺二维码" style={styles.cell}>
            <Icon icon="QRCode" />
          </Cell>
          <Cell label="营业执照" style={styles.cell}>
            <Icon icon="shieldStar" />
          </Cell>
          <Cell label="特殊许可证" style={styles.cell}>
            <Icon icon="certificate" />
          </Cell>
          <Cell label="经营范围" style={styles.cell}>
            <Icon icon="certificate" />
          </Cell>
        </CellGroup>
        <Card style={styles.card}>
          <Text>授权品牌</Text>
          <View style={styles.brandNameContainer}>
            {mSellerIndex?.brandNames.map((brandName, index) => (
              <View style={styles.brandName} key={`${brandName}_${index}`}>
                <Text size="small" color="secondary">{brandName}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  meta: {
    paddingLeft: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 2,
    resizeMode: 'contain',
  },
  metaContent: {
    flex: 1,
    rowGap: 6,
    paddingTop: 10,
  },
  main: {
    rowGap: 10,
    paddingVertical: 10,
  },
  group: {
    marginHorizontal: 10,
    paddingHorizontal: 12,
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  cellContent: {
    justifyContent: 'flex-start'
  },
  card: {
    marginHorizontal: 10,
  },
  brandNameContainer: {
    gap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  brandName: {
    width: '48.2%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: '#f5f6fa',
  }
})

export default StoreInfo;
