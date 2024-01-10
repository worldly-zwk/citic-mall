import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Alert, Button, Empty, Space, Typography } from '@/components';
import { ContactScreenProps } from '@/typings';
import { useRequest } from '@/hooks';
import { MEMBER } from '@/services';
import request from '@/utils/request';
import Toast from 'react-native-root-toast';
import { toast } from '@/utils';

const Contact = ({ route, navigation }: ContactScreenProps) => {
  const [checkedKey, setCheckedKey] = useState<number>();
  const [state, actions] = useRequest<API.MemberAuth[]>(MEMBER.auths, {
    defaultParams: {
      authFlag: 9
    },
    onSuccess: (list) => {
      for(const item of list) {
        if (item.isDefault === 1) {
          setCheckedKey(item.id);
        }
      }
    },
  });

  const handleDelete = useCallback((id: number) => {
    Alert.confirm({
      width: 340,
      message: '海关要求购买跨境商品需提供订购人实名信息，若删除所有认证信息，下单时需重新认证信息，确认删除吗？',
      okText: '确定删除',
      contentStyle: { textAlign: 'left' },
      okButtonStyle: { color: '#d7000f' },
      onOk: () => {

      }
    })
  }, [actions]);

  const handleChecked = useCallback((id: number, checked: boolean) => {
    if (checked) {
      const originKey = checkedKey;
      setCheckedKey(id);
      request.put(`${MEMBER.defaultAddress}/${id}`).catch(() => {
        setCheckedKey(originKey);
      });
    }
  }, []);

  const renderContent = () => {
    if (!state.data?.length) {
      return (
        <Empty
          style={styles.empty}
          image={require('@/assets/images/empty/contact.png')}
          title="暂无常用联系人信息"
          description="快去添加一位吧～"
        />
      )
    }
    return (
      <ScrollView contentContainerStyle={styles.main}>
        {state.data?.map(authInfo => (
          <View style={styles.contact} key={authInfo.id}>
            <Space style={styles.content} align="center" size={12}>
              <Typography.Text strong="500">{authInfo.idCardName}</Typography.Text>
              <Typography.Text color="secondary" size="small">{authInfo.idCardNo}</Typography.Text>
            </Space>
            <Space style={styles.footer}>
              <Typography.Text color="secondary" size="small">设为默认购票人</Typography.Text>
              <Switch />
            </Space>
          </View>
        ))}
      </ScrollView>
    )
  }

  

  return (
    <View style={styles.container}>
      {renderContent()}
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button} to={{ screen: 'ContactForm' }}>新增人员信息</Button>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    rowGap: 12,
    padding: 12,
  },
  empty: {
    flex: 1,
    margin: 12,
    paddingTop: 42,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  contact: {
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  footer: {
    height: 40,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  }
})

export default Contact;
   