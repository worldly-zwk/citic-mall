import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { AfterSalesScreenProps } from '@/typings/screen';
import { Cell } from '@/components';

const CellGroup = Cell.Group;

const AfterSales = ({ route, navigation }: AfterSalesScreenProps) => {
  return (
    <View style={styles.container}>
      <CellGroup>
        <Cell prefix="refund" label="我的退款" />
        <Cell prefix="return" label="我的退货" />
        <Cell prefix="barter" label="我的换货/维修" />
        <Cell prefix="appeal" label="我的申诉" />
      </CellGroup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
})

export default AfterSales;
