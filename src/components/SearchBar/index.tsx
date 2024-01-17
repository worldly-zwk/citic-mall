import { ReactNode, useCallback } from 'react';
import { Image, StyleSheet, TextInput, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';
import GlobalBack from '../GlobalBack';
import Link from '../Link';

interface SearchBarProps extends TextInputProps {
  back?: boolean;
  extra?: ReactNode;
  editable?: boolean;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { back, extra, editable = false, onPress, ...restProps } = props;

  const renderExtra = useCallback(() => {
    if (typeof extra === 'undefined') {
      return (
        <Link to={{ screen: 'Notice'}}>
          <Image style={styles.news} source={require('@/assets/images/icons/message.png')} />
        </Link>
      );
    }
    return extra;
  }, [extra]);

  return (
    <View style={styles.searchBar}>
      {back && (
        <GlobalBack style={styles.back} />
      )}
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.search}>
          <Image style={styles.searchIcon} source={require('@/assets/images/icons/search.png')} />
          <TextInput
            autoFocus
            onPressIn={onPress}
            editable={editable}
            style={styles.searchInput}
            placeholder="搜索商品，了解更多"
            {...restProps}
          />
        </View>
      </TouchableWithoutFeedback>
      {extra !== null && (
        <View style={styles.extra}>
          {renderExtra()}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  back: {
    marginLeft: 10,
    marginRight: 4
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    borderRadius: 30,
    backgroundColor: '#f5f6fa'
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginHorizontal: 12
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#e65321',
    fontSize: 14,
  },
  extra: {
    marginLeft: 15,
    marginRight: 5,
  },
  news: {
    width: 24,
    height: 24,
  }
})

export default SearchBar;
