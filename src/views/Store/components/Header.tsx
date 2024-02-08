import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalBack, Link, Typography } from '@/components';
import StoreAvatar from './StoreAvatar';

interface StoreMetaProps {
  id: number;
  logo?: string;
  name?: string;
  collectionCount?: number;
}

const StoreHeader = ({ id, logo, name, collectionCount }: StoreMetaProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <Link style={styles.container} to={{ screen: 'StoreInfo', params: { id } }}>
        <GlobalBack />
        <StoreAvatar avatar={logo} style={styles.logo} />
        <View>
          <Typography.Text style={styles.name} size="large" strong>{name}</Typography.Text>
          <Typography.Text size="mini" color="secondary">{collectionCount || 0}人关注</Typography.Text>
        </View>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  logo: {
    marginHorizontal: 8,
  },
  name: {
    marginBottom: 2
  }
})

export default StoreHeader;
