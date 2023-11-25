import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";

interface SearchBarProps {
  
}

const SearchBar: FC<SearchBarProps> = () => {

  return (
    <View style={styles.searchBar}>
      <View style={styles.searchBar_text}></View>
      <Image style={styles.searchBar_icon} source={require('@/assets/images/icons/message.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    height: 46,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 16
  },
  searchBar_text: {
    flex: 1,
    height: 32,
    backgroundColor: '#f5f6fa',
    borderRadius: 32,
  },
  searchBar_icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  }
})

export default SearchBar;
