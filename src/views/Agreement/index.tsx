import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useRequest } from '@/hooks';
import { HOME } from '@/services';
import { AgreementScreenProps } from '@/typings';

const Agreement = ({ route, navigation }: AgreementScreenProps) => {
  const [state] = useRequest<API.Agreement>(`${HOME.agreement}/${route.params.id}`, {
    onSuccess: result => {
      navigation.setOptions({ title: result.title });
    }
  });

  const content = useMemo(() => {
    return `
      <style>
        body {
          padding: 20px;
        }
      </style>
      ${state.data?.content || ''}
    `
  }, [state.data]);

  return (
    <View style={styles.container}>
      <WebView containerStyle={styles.content} source={{ html: content }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  content: {
    // padding: 20,
    borderRadius: 6,
  }
})

export default Agreement;
   