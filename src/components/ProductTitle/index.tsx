import { StyleSheet, Text, View } from 'react-native';
import { ProductScreenProps } from '@/typings/screen';

const ProductTitle = (props: ProductScreenProps) => {

  return (
    <View style={styles.container}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

export default ProductTitle;
