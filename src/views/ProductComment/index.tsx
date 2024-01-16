import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Space } from '@/components';
import { ProductCommentScreenProps } from '@/typings';
import CommentList from './List';

const ProductComment = ({ route }: ProductCommentScreenProps) => {
  const [grade, setGrade] = useState('all');
  const [state, setState] = useState<Omit<API.ProductCommentResponse, 'productComments' | 'count'>>();

  const buttons = useMemo(() => {
    return [
      {
        key: 'all',
        text: `全部评价 ${state?.allNum || 0}`
      },
      {
        key: 'image',
        text: `有图 ${state?.existImgNum || 0}`
      },
      {
        key: 'high',
        text: `好评 ${state?.goodNum || 0}`
      },
      {
        key: 'middle',
        text: `中评 ${state?.mediumNum || 0}`
      },
      {
        key: 'low',
        text: `差评 ${state?.negativeNum || 0}`
      },
    ]
  }, [state]);

  return (
    <View style={styles.container}>
      <Space style={styles.tabs} size={8} align="center">
        {buttons.map(({ key, text }) => (
          <Button
            round
            size="small"
            type={grade === key ? undefined : 'secondary'}
            style={styles.button}
            onPress={() => setGrade(key)}
          >{text}</Button>
        ))}
      </Space>
      <View style={styles.list}>
        <CommentList id={route.params.id} grade={grade} onLoad={setState} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#f5f6fa',
    borderWidth: 0,
  },
  list: {
    flex: 1,
  }
});

export default ProductComment;
