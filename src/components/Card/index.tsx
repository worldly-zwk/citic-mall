import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface CardProps extends ViewProps {
  contentStyle?: StyleProp<ViewStyle>;
}

const Card = (props: CardProps) => {
  const { contentStyle, children } = props;

  return (
    <View style={styles.container}>
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
  content: {
    padding: 12,
  }
})

export default Card;
   