import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { OrderScreenProps } from '@/typings/screen';

const Order = ({ route, navigation }: OrderScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    rowGap: 12,
    padding: 12,
  },
  logout: {
    alignItems: 'center',
    paddingVertical: 13.5
  }
})

export default Order;
