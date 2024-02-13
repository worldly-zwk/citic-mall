import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, SearchBar, Typography } from '@/components';
import { StoreSearchScreenProps } from '@/typings';
import StoreSearchList from './List';

const { Text } = Typography;

const StoreSearch = ({ route, navigation }: StoreSearchScreenProps) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      <View style={[styles.searchBar, { paddingTop: insets.top }]}>
        <SearchBar
          editable
          extra={(
            <Link onPress={navigation.goBack}>
              <Text size={13} color="secondary">取消</Text>
            </Link>
          )}
          onSubmitEditing={(e) => {
            navigation.navigate('StoreSearchList', { id, keyword: e.nativeEvent.text });
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#fff'
  }
});

StoreSearch.List = StoreSearchList;

export default StoreSearch;
