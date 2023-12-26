import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import Typography from '../Typography';
import { useMemo } from 'react';

interface TagProps extends ViewProps {
  color?: string;
  children?: string;
}

const Tag = (props: TagProps) => {
  const { color, style, children } = props;

  const tagStyles = useMemo(() => {
    const tagStyle: ViewStyle = {};
    if (color) {
      tagStyle.backgroundColor = color;
    }

    return [styles.tag, tagStyle, style];
  }, [color]);

  return (
    <View style={tagStyles}>
      <Typography.Text size="small" color={color ? 'white' : 'primary'}>{children}</Typography.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 2,
    paddingHorizontal: 3,
  },
  borderd: {
    borderColor: '#e65321',
    borderWidth: StyleSheet.hairlineWidth,
  }
})

export default Tag;

