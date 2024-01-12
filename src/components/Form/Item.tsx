import { cloneElement, isValidElement, useContext, useMemo } from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewProps, ViewStyle } from "react-native";
import Typography from "../Typography";
import useFormField from "./hooks/useFormField";
import { FieldProps } from "./typings";
import { FormContext } from "./context";

interface FormItemProps extends ViewProps, FieldProps {
  help?: string;
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const FormItem = (props: FormItemProps) => {
  const {
    help,
    label,
    style,
    layout,
    contentStyle,
    children,
    labelWidth,
    labelStyle,
    labelTextStyle,
  } = props;
  const formContext = useContext(FormContext);
  const colon = formContext.colon || props.colon;
  const isHorizontal = (layout || formContext.layout) === 'horizontal';
  const itemStyles = [styles.item, isHorizontal ? styles.horizontalItem : null, style];
  const labelStyles = useMemo(() => {
    const labelContainerStyle: ViewStyle = {
      width: labelWidth || formContext.labelWidth
    };
    if (isHorizontal) {
      Object.assign(labelContainerStyle, styles.horizontalLabel)
    }
    return StyleSheet.compose(styles.label, [labelContainerStyle, labelStyle]);
  }, [isHorizontal, labelStyle, labelWidth, formContext]);

  const contentStyles = [isHorizontal ? styles.horizontalContent : null, contentStyle];

  const getControlled = useFormField(props);

  return (
    <View style={itemStyles}>
      {label && (
        <View style={labelStyles}>
          <Typography.Text style={labelTextStyle}>
            {label}
            {(isHorizontal && colon) && ' :'}
          </Typography.Text>
        </View>
      )}
      <View style={contentStyles}>
        {isValidElement(children) ? cloneElement(children, getControlled(children.props)) : children}
      </View>
      {help && (
        <Typography.Text size="small" color="secondary" style={styles.help}>{help}</Typography.Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 12
  },
  horizontalItem: {
    flexDirection: 'row',
    columnGap: 8,
  },
  label: {
    height: 44,
    marginBottom: 6,
    justifyContent: 'center',
  },
  horizontalLabel: {
    marginBottom: 0,
  },
  colon: {
    marginLeft: 2,
    marginRight: 8,
  },
  horizontalContent: {
    flex: 1
  },
  help: {
    marginTop: 12,
  }
});


export default FormItem;
