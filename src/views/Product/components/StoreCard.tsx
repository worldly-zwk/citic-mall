import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import Typography from "@/components/Typography";

interface StoreCardProps {
  data?: API.ProductInfo;
}

const StoreCard: FC<StoreCardProps> = ({ data }) => {

  return (
    <View style={styles.container}>
     <Image style={styles.avatar} source={{ uri: data?.sellerLogo }} />
     <View style={styles.content}>
        <Typography.Text style={styles.name} strong>{data?.sellerName}</Typography.Text>
        <Typography.Text style={styles.desc} size="small" color="disabled" numberOfLines={2}>{data?.sellerNotice}</Typography.Text>
        <Image style={styles.tag} source={require('@/assets/images/tag/store.png')} />
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  content: {
    position: 'relative',
    marginLeft: 12,
    flex: 1,
  },
  name: {
    lineHeight: 22,
  },
  desc: {
    marginTop: 4,
  },
  tag: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: 68,
    height: 16,
    right: 2,
    top: 4,
  }
})

export default StoreCard;
