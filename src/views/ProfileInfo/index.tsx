import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Alert, Avatar, Cell, Link, Tag, Typography } from '@/components';
import { useMember } from '@/store';

const { Text } = Typography;
const CellGroup = Cell.Group;

const ProfileInfo = () => {
  const member = useMember(state => state.member);
  const isStaff = member?.authStaff === 1;

  const switchGender = useCallback(() => {
    Alert.alert({ message: `您已认证中信员工身份\n快去购买专属优惠商品吧` });
  }, []);

  return (
    <View style={styles.container}>
      <Link style={styles.head}>
        <Avatar src={member?.headPortrait} style={styles.avatar} />
        <Text color="disabled" size="small">点击修改头像</Text>
      </Link>
      <CellGroup>
        <Cell label="登录名">
          <Text>{member?.name}</Text>
        </Cell>
        <Cell label="昵称" to={{ screen: 'Nickname', params: { name: member?.nickname } }}>
          <Text>{member?.nickname}</Text>
        </Cell>
        <Cell label="性别" isLink onPress={switchGender}>
          <Text>{member?.gender === 1 ? '男' : '女'}</Text>
        </Cell>
        <Cell label="员工认证" isLink to={{ screen: 'Staff' }}>
          <Tag color={isStaff ? undefined : 'disabled'}>{isStaff ? '中信员工' : '非中信员工'}</Tag>
        </Cell>
      </CellGroup>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  head: {
    alignItems: 'center',
    borderRadius: 6,
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  avatar: {
    marginBottom: 10,
  }
})

export default ProfileInfo;
