import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import Typography from '../Typography';

interface CardProps extends ViewProps {
  title?: string;
  header?: ReactNode;
  titleStyle?: TextStyle;
  contentStyle?: StyleProp<ViewStyle>;
}

const Card = (props: CardProps) => {
  const { title, header, style, titleStyle, contentStyle, children } = props;

  const renderHeader = () => {
    if (header) {
      return header;
    }

    if (title) {
      return (
        <View style={styles.header}>
          <Typography.Text style={titleStyle}>{title}</Typography.Text>
        </View>
      )
    }
  }

  return (
    <View style={[styles.container, style]}>
      {renderHeader()}
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
   