import { StyleSheet, View, ViewProps } from 'react-native';
import Space from '../Space';
import Typography from '../Typography';

interface DividerProps extends ViewProps {
  
}

const Divider = (props: DividerProps) => {
  const { style, children } = props;

  return (
    <Space style={[styles.container, style]}>
      <View style={styles.line} />
      <Typography.Text size="small" color="secondary" style={styles.text}>
        {children}
      </Typography.Text>
      <View style={styles.line} />
    </Space>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd'
  },
  text: {
    marginHorizontal: 15,
  }
})

export default Divider;
