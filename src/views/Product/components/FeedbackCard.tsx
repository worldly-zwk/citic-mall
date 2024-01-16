import { FC, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Comment, Link, Space, Typography } from "@/components";
import { isTrue } from "@/utils";

const { Title, Text } = Typography;

interface FeedbackCardProps {
  id: number;
  data?: API.ProductCommentResponse;
}

const FeedbackCard: FC<FeedbackCardProps> = ({ id, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title level={4}>评价</Title>
        <Space>
          <Text size="small" color="secondary">{data?.allNum ? '好评率' : '暂无评价'}</Text>
          {!!data?.allNum && (
            <Text size="small" color="primary">{data.favorableRate || 0}%</Text>
          )}
        </Space>
      </View>
      {!!data?.productComments.length && (
        <View>
          {data.productComments.map(({ id, grade, userName, userHeadPortrait, content, imageList }) => {
            return <Comment style={styles.bordered} user={{ avatar: userHeadPortrait, name: userName }} images={imageList} rate={grade} key={id}>{content}</Comment>
          })}
        </View>
      )}
      {!!data?.allNum && (
        <View style={styles.footer}>
          <Link style={styles.button} to={{ screen: 'ProductComment', params: { id } }}>
            <Text size={13}>全部评价（{data.allNum}）</Text>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bordered: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  button: {
    width: 170,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#dcdcdc',
    borderWidth: StyleSheet.hairlineWidth,
  }
})

export default FeedbackCard;
