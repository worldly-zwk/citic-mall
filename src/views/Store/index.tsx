import { useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Avatar, Icon, Link, SearchBar, Space, Tag, Typography } from '@/components';
import { StoreScreenProps } from '@/typings';

const Store = ({ navigation }: StoreScreenProps) => {

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar back extra={null} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default Store;
