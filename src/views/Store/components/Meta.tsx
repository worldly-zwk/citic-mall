import { Image, StyleSheet, View } from 'react-native';
import { Space, Typography } from '@/components';

interface StoreMetaProps {
  logo?: string;
  name?: string;
  collectionCount?: number;
}

const StoreMeta = ({ logo, name, collectionCount }: StoreMetaProps) => {
  return (
    <Space style={styles.container} size={16}>
      <Image style={styles.logo} source={{ uri: logo }} />
      <View>
        <Typography.Text style={styles.name} color="white">{name}</Typography.Text>
        <Typography.Text size="small" color="white">{collectionCount || 0}人关注</Typography.Text>
      </View>
    </Space>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'stretch'
  },
  name: {
    fontSize: 15,
    lineHeight: 24,
    marginVertical: 8,
  }
})

export default StoreMeta;
