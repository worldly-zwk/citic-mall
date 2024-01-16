import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { maskMiddle } from '@/utils';
import Space from '../Space';
import Typography from '../Typography';
import Avatar from '../Avatar';
import Rate from '../Rate';

interface CommentProps extends ViewProps {
  rate?: number;
  user: {
    avatar?: string;
    name: string;
  };
  images?: string[];
}

const Comment = (props: CommentProps) => {
  const { rate, user, images, style, children, ...restProps } = props;
  return (
    <View style={[styles.container, style]} {...restProps}>
      <Space style={styles.header} align="center">
        <Space size={8} align="center">
          <Avatar size={32} src={user.avatar} />
          <Typography.Text color="black">{maskMiddle(user.name)}</Typography.Text>
        </Space>
        <Rate value={rate} readOnly />
      </Space>
      <View>
        <Typography.Text size={13} style={{ lineHeight: 20 }}>{children}</Typography.Text>
        <View style={styles.grid}>
          {images?.map((item, index) => (
            <View style={styles.image} key={`${index}_${item}`}>
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: item }} />
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  header: {
    height: 60,
    justifyContent: 'space-between',
  },
  grid: {
    rowGap: 8,
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '32%',
    aspectRatio: 1,
  }
});

export default Comment;
