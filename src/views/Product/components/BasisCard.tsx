import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import Typography from "@/components/Typography";

interface GoodsInfoProps {
  data?: API.Product;
}

const GoodsInfo: FC<GoodsInfoProps> = ({ data }) => {
  if (data) {
    return (
      <Typography style={styles.container}>
        <Typography.Title style={styles.name} numberOfLines={2} lineBreakMode="tail">{data.name1}</Typography.Title>
        <Typography.Text size="small" primary>{data.name2}</Typography.Text>
        <Typography style={styles.mallPrice}>
          <Typography.Price size="large">{data.mallPcPrice}</Typography.Price>
          <Typography.Text size="small" type="disabled" style={styles.marketPrice} delete>¥{data.marketPrice}</Typography.Text>
        </Typography>
        {data.countryId && (
          <View style={styles.brand}>
            <Image style={styles.brandIcon} source={{ uri: data.nationalFlag }} />
            <Typography.Text size="mini">{data.countryName} {data.productBrandName}</Typography.Text>
          </View>
        )}
      </Typography>
    )
  }
  
  return null;
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  name: {
    lineHeight: 22,
    marginBottom: 4,
  },
  mallPrice: {
    flexDirection: 'row',
    columnGap: 4,
    marginTop: 12,
    alignItems: 'flex-end',
  },
  marketPrice: {
    marginBottom: 3
  },
  mallPriceUnit: {
    marginTop: 12,
  },
  brand: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  brandIcon: {
    width: 16,
    height: 16,
  },

})

export default GoodsInfo;
