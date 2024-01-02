import { StyleProp, StyleSheet, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import Typography from '../Typography';

interface CardProps extends ViewProps {
  title?: string;
  titleStyle?: TextStyle;
  contentStyle?: StyleProp<ViewStyle>;
}

const Card = (props: CardProps) => {
  const { title, titleStyle, contentStyle, children } = props;

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.header}>
          <Typography.Text style={titleStyle}>{title}</Typography.Text>
        </View>
      )}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    padding: 12,
  }
})

export default Card;
   