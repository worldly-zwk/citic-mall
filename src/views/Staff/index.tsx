import { useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Alert, Avatar, Icon, Link, Space, Tag, Typography } from '@/components';
import { useMember } from '@/store';
import { StaffScreenProps } from '@/typings';

const Staff = ({ navigation }: StaffScreenProps) => {
  const member = useMember(state => state.member);
  const isStaff = member?.authStaff === 1;

  const handleToGOAuth = useCallback(() => {
    if (isStaff) {
      Alert.alert({
        message: `您已认证中信员工身份\n快去购买专属优惠商品吧`
      });
      return;
    }
    navigation.navigate('StaffAuth');
  }, [isStaff]);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image style={styles.avatar} source={{ uri: member?.headPortrait }} />
        <Avatar src={member?.headPortrait} style={styles.avatar} />
        {isStaff && (
          <View style={styles.staff}>
            <Typography.Text size="small" color="primary">中信员工</Typography.Text>
          </View>
        )}
      </View>
      <Link style={styles.cell} onPress={handleToGOAuth}>
        <View style={{ flex: 1 }}>
          <Space size={12} align="center">
            <Typography.Title>员工认证</Typography.Title>
            <Tag color={isStaff ? undefined : 'disabled'}>{isStaff ? '已认证' : '未认证'}</Tag>
          </Space>
          <Typography.Text color="secondary" size="small" style={styles.desc}>认证中信员工身份后部分商品可享受员工优惠价</Typography.Text>
        </View>
        <Icon icon="arrow" />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  head: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    marginBottom: 12,
  },
  staff: {
    borderColor: '#e65321',
    borderWidth: 1,
    borderRadius: 26,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  cell: {
    flexDirection: 'row',
    columnGap: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  desc: {
    marginTop: 4
  }
})

export default Staff;
