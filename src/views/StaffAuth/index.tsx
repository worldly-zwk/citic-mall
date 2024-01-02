import { StyleSheet, View } from 'react-native';
import { Card, Cell } from '@/components';
import StaffAuthMail from './Mail';
import StaffAuthPhone from './Phone';
import StaffAuthEmail from './Email';

const CellGroup = Cell.Group;

const StaffAuth = () => {
  return (
    <View style={styles.container}>
      <Card title="自动审核" titleStyle={styles.title} contentStyle={{ padding: 0 }}>
        <Cell label="邮箱自动认证" to={{ screen: 'StaffAuthEmail' }} />
      </Card>
      <Card title="人工审核" titleStyle={styles.title} contentStyle={{ paddingVertical: 0 }}>
        <CellGroup>
          <Cell label="企业邮箱认证" style={styles.cell} to={{ screen: 'StaffAuthMail' }} />
          <Cell label="客服认证" style={styles.cell} to={{ screen: 'StaffAuthPhone' }} />
        </CellGroup>
      </Card>
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
  }
});

StaffAuth.Email = StaffAuthEmail;
StaffAuth.Mail = StaffAuthMail;
StaffAuth.Phone = StaffAuthPhone;

export default StaffAuth;
