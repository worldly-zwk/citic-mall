import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalBack, Space, Typography } from '@/components';

interface StoreMetaProps {
  logo?: string;
  name?: string;
  collectionCount?: number;
}

const StoreHeader = ({ logo, name, collectionCount }: StoreMetaProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <Space style={styles.container}>
        <GlobalBack />
        <Image style={styles.logo} source={{ uri: logo }} />
        <View>
          <Typography.Text style={styles.name} size="large" strong>{name}</Typography.Text>
          <Typography.Text size="mini" color="secondary">{collectionCount || 0}人关注</Typography.Text>
        </View>
      </Space>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    alignItems: 'center',
    paddingLeft: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },
  name: {
    marginBottom: 2
  }
})

export default StoreHeader;
