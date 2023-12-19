import { StyleSheet, View, ViewProps } from 'react-native';
import Typography from '../Typography';

interface TagProps extends ViewProps {
  children?: string;
}

const Tag = (props: TagProps) => {
  const { children } = props;

  return (
    <View style={styles.tag}>
      <Typography.Text size="small" primary>{children}</Typography.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 2,
    borderRadius: 2,
    borderColor: '#e65321',
    borderWidth: StyleSheet.hairlineWidth,
  }
})

export default Tag;

