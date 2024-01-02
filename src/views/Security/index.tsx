import { StyleSheet, View } from 'react-native';
import { Card, Cell } from '@/components';
// import StaffAuthMail from './Mail';
// import StaffAuthPhone from './Phone';
// import StaffAuthEmail from './Email';

const CellGroup = Cell.Group;

const Security = () => {
  return (
    <View style={styles.container}>
      <Card title="安全设置" contentStyle={{ paddingVertical: 0 }}>
        <CellGroup>
          <Cell
            label="登录密码"
            style={styles.cell}
            labelStyle={styles.cellLabel}
            description="建议您定期更改密码，以便保护您的账户安全"
            to={{ screen: 'StaffAuth' }}
          />
          <Cell
            label="绑定手机"
            style={styles.cell}
            labelStyle={styles.cellLabel}
            description="若手机号更换请尽快修改"
            to={{ screen: 'StaffAuthMail' }}
            />
          <Cell
            label="绑定邮箱"
            style={styles.cell}
            labelStyle={styles.cellLabel}
            description="绑定邮箱便于你尽快找回登录密码，接受账号信息"
            to={{ screen: 'StaffAuthPhone' }}
          />
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
  },
  cellLabel: {
    fontWeight: '600'
  }
});

// StaffAuth.Email = StaffAuthEmail;
// StaffAuth.Mail = StaffAuthMail;
// StaffAuth.Phone = StaffAuthPhone;

export default Security;
