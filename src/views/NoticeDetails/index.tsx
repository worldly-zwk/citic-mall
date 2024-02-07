import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useRequest } from '@/hooks';
import { Card, Typography, RichText } from '@/components';
import { NoticeDetailsScreenProps } from '@/typings';
import { HOME } from '@/services';

const NoticeDetails = ({ route }: NoticeDetailsScreenProps) => {
  const [state] = useRequest<API.NoticeInfoResponse>(HOME.noticeDetail, {
    defaultParams: {
      id: route.params.id,
    }
  });
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container}>
      {state.data && (
        <Card contentStyle={{ gap: 8 }}>
          <Typography.Title numberOfLines={2}>{state.data.title}</Typography.Title>
          <Typography.Text size="small" color="secondary">易家公告 | {state.data.timeName}</Typography.Text>
          <RichText source={{ html: state.data.content }} contentWidth={width - 24} />
        </Card>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  content: {
    borderRadius: 6,
  }
})

export default NoticeDetails;
   