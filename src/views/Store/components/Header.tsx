import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, GlobalBack, Icon, Link, Typography } from '@/components';
import StoreAvatar from './StoreAvatar';

interface StoreHeaderProps {
  data: {
    id: number;
    logo?: string;
    name?: string;
    collected?: boolean;
    collectionCount?: number;
  };
  onSearch?: () => void;
  onCollection?: () => void;
}

const StoreHeader = ({ data, onSearch, onCollection }: StoreHeaderProps) => {
  const { id, logo, name, collected, collectionCount } = data;
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <View style={styles.container}>
        <GlobalBack />
        <Link style={styles.store} to={{ screen: 'StoreInfo', params: { id } }}>
          <StoreAvatar avatar={logo} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Typography.Text style={styles.name} size="large" strong numberOfLines={1}>{name}</Typography.Text>
            <Typography.Text size="mini" color="secondary">{collectionCount || 0}人关注</Typography.Text>
          </View>
        </Link>
        <Button size="small" type={collected ? 'disabled' : undefined} onPress={onCollection}>{collected ? '已关注' : '+ 关注'}</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  store: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 8,
  },
  name: {
    marginBottom: 2
  }
})

export default StoreHeader;
