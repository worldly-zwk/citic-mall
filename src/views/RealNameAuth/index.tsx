import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Alert, Button } from '@/components';
import { RealNameAuthScreenProps } from '@/typings';
import { useRequest } from '@/hooks';
import { MEMBER } from '@/services';
import request from '@/utils/request';
import RealNameCard from './Card';
import NotFound from './NotFound';

const RealNameAuth = ({ route, navigation }: RealNameAuthScreenProps) => {
  const [checkedKey, setCheckedKey] = useState<number>();
  const [state, actions] = useRequest<API.MemberAuth[]>(MEMBER.auths, {
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

  if (!state.loading && !state.data?.length) {
    return (
      <NotFound />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        {state.data?.map(realName => (
          <RealNameCard
            data={realName}
            checked={realName.id === checkedKey}
            onDelete={() => handleDelete(realName.id)}
            onCheckedChange={(checked) => handleChecked(realName.id, checked)}
          />
        ))}
      </ScrollView>
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button} to={{ screen: 'RealNameAuthForm' }}>添加实名认证</Button>
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
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  }
})

export default RealNameAuth;
   