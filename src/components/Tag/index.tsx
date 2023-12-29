import { useMemo } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import Typography from '../Typography';

const colorPresets = {
  disabled: '#dbdbdb'
}

type ColorPresetsKeys = keyof typeof colorPresets;

interface TagProps extends ViewProps {
  color?: LiteralUnion<ColorPresetsKeys>;
  children?: string;
}

const Tag = (props: TagProps) => {
  const { color, style, children } = props;

  const tagStyles = useMemo(() => {
    const tagStyle: ViewStyle = {};
    if (color) {
      tagStyle.backgroundColor = colorPresets[color as ColorPresetsKeys] || color;
    } else {
      Object.assign(tagStyle, styles.borderd);
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
    borderWidth: 1,
  }
})

export default Tag;

