import { useCallback, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '@/components';
import { AddressScreenProps } from '@/typings';
import { useRequest } from '@/hooks';
import { MEMBER } from '@/services';
import request from '@/utils/request';
import { useOrder } from '@/store';
import AddressCard from './Card';

const Address = ({ route, navigation }: AddressScreenProps) => {
  const { params } = route;
  const orderUpdate = useOrder(state => state.update);
  const [checkedKey, setCheckedKey] = useState<number>();
  const [state, actions] = useRequest<API.Address[]>(MEMBER.address, {
    onSuccess: (list) => {
      for(const item of list) {
        if (item.state === 1) {
          setCheckedKey(item.id);
        }
      }
    },
  });

  const handleSelected = useCallback((id: number) => {
    if (params?.source) {
      orderUpdate({ addressId: id });
      navigation.navigate(params.source);
    }
  }, [params, orderUpdate]);

  const handleDelete = useCallback((id: number) => {
    Alert.alert('您确定删除吗？', undefined, [
      {
        text: '取消',
        style: 'cancel',
      },
      {
        text: '确定',
        style: 'destructive',
        onPress: () => {
          request.delete(`${MEMBER.address}/${id}`).then(() => {
            actions.run();
          });
        }
      },
    ])
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.main}>
        {state.data?.map(address => (
          <AddressCard
            data={address}
            source={params?.source}
            checked={address.id === checkedKey}
            onPress={() => handleSelected(address.id)}
            onDelete={() => handleDelete(address.id)}
            onCheckedChange={(checked: boolean) => handleChecked(address.id, checked)}
            key={address.id}
          />
        ))}
      </ScrollView>
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button} to={{ screen: 'AddressForm', params }}>添加收获地址</Button>
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

export default Address;
   