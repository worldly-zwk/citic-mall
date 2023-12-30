import { StyleSheet, View } from 'react-native';
import { Cell } from '@/components';
import StaffAuthMail from './Mail';
import StaffAuthPhone from './Phone';
import StaffAuthEmail from './Email';

const CellGroup = Cell.Group;

const StaffAuth = () => {
  return (
    <View style={styles.container}>
      <CellGroup>
        <Cell label="自动审核" style={styles.header} labelStyle={styles.title} />
        <Cell label="邮箱自动认证" to={{ screen: 'StaffAuthEmail' }} />
      </CellGroup>
      <CellGroup>
        <Cell label="人工审核" style={styles.header} labelStyle={styles.title} />
        <Cell label="企业邮箱认证" style={styles.cell} to={{ screen: 'StaffAuthMail' }} />
        <Cell label="客服认证" to={{ screen: 'StaffAuthPhone' }} />
      </CellGroup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    padding: 12,
  },
  header: {
    paddingVertical: 15,
  },
  title: {
    color: '#999',
  },
  cell: {
    paddingHorizontal: 0,
    marginHorizontal: 12,
  }
});

StaffAuth.Email = StaffAuthEmail;
StaffAuth.Mail = StaffAuthMail;
StaffAuth.Phone = StaffAuthPhone;

export default StaffAuth;
