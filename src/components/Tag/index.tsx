import { useMemo } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import Typography from '../Typography';

const colorPresets = {
  primary: '#e65321',
  secondary: '#666',
  disabled: '#dbdbdb'
}

type ColorPresetsKeys = keyof typeof colorPresets;

interface TagProps extends ViewProps {
  color?: LiteralUnion<ColorPresetsKeys>;
  textColor?: LiteralUnion<ColorPresetsKeys>;
  children?: string;
}

const Tag = (props: TagProps) => {
  const { color, style, children, textColor = color ? 'white' : 'primary', ...restProps } = props;

  const tagStyles = useMemo(() => {
    const tagStyle: ViewStyle = {};
    if (color) {
      tagStyle.backgroundColor = colorPresets[color as ColorPresetsKeys] || color;
    } else {
      Object.assign(tagStyle, styles.borderd);
    }

    return [styles.tag, tagStyle, style];
  }, [color, style]);

  return (
    <View style={tagStyles} {...restProps}>
      <Typography.Text size="small" color={textColor}>{children}</Typography.Text>
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

