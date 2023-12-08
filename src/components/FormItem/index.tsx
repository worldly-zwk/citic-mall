import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import Typography from "../Typography";

interface FormItemProps extends ViewProps {
  label: string;
  layout?: 'horizontal' | 'vertical';
  contentStyle?: StyleProp<ViewStyle>;
}

const FormItem = (props: FormItemProps) => {
  const { label, style, layout = 'vertical', contentStyle, children } = props;
  const isHorizontal = layout === 'horizontal';
  const itemStyles = [styles.item, isHorizontal ? styles.horizontalItem : null, style];
  const labelStyles = [styles.label, isHorizontal ? styles.horizontalLabel : null];
  const contentStyles = [styles.content, isHorizontal ? styles.horizontalContent : null, contentStyle];

  return (
    <View style={itemStyles}>
      <View style={labelStyles}>
        <Typography.Text size="large">{label}</Typography.Text>
      </View>
      <View style={contentStyles}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 12
  },
  horizontalItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginBottom: 8,
  },
  horizontalLabel: {
    marginBottom: 0,
  },
  content: {
    flexWrap: 'wrap',
    minHeight: 44
  },
  horizontalContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  }
});


export default FormItem;
