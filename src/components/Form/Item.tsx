import { cloneElement, isValidElement, useCallback, useContext, useMemo } from "react";
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextStyle, View, ViewProps, ViewStyle } from "react-native";
import Typography from "../Typography";
import { FormContextProps } from "./typings";
import { FieldContext, FormContext } from "./context";
import { getValueFromEvent } from "./utils";

interface FormItemProps extends ViewProps, FormContextProps {
  name?: string;
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  trigger?: string;
  valuePropName?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

const FormItem = (props: FormItemProps) => {
  const {
    name,
    label,
    style,
    layout,
    contentStyle,
    children,
    labelWidth,
    labelStyle,
    labelTextStyle,
    trigger = 'onChange',
    valuePropName = 'value'
  } = props;
  const formContext = useContext(FormContext);
  const fieldContext = useContext(FieldContext);
  const colon = formContext.colon || props.colon;
  const isHorizontal = (layout || formContext.layout) === 'horizontal';
  const itemStyles = [styles.item, isHorizontal ? styles.horizontalItem : null, style];
  const labelStyles = useMemo(() => {
    const labelStyle: ViewStyle = {
      width: labelWidth || formContext.labelWidth
    };
    if (isHorizontal) {
      Object.assign(labelStyle, styles.horizontalLabel)
    }
    return StyleSheet.compose(styles.label, [labelStyle, labelStyle]);
  }, [isHorizontal, labelStyle, labelWidth, formContext]);

  const contentStyles = [isHorizontal ? styles.horizontalContent : null, contentStyle];

  const fieldProps = useCallback((childProps: RecordAny) => {
    const originTriggerFunc = childProps[trigger];
    const controlProps = { ...childProps };
    if (name) {
      controlProps[valuePropName] = fieldContext.getValue(name);
      controlProps[trigger] =  (event: NativeSyntheticEvent<any>) => {
        fieldContext.setValue(name, getValueFromEvent(event));
        originTriggerFunc?.(event);
      }
    }
    return controlProps;
  }, [name, trigger, valuePropName]);

  return (
    <View style={itemStyles}>
      {label && (
        <View style={labelStyles}>
          <Typography.Text style={labelTextStyle} color="secondary">
            {label}
            {(isHorizontal && colon) && ' :'}
          </Typography.Text>
        </View>
      )}
      <View style={contentStyles}>
        {isValidElement(children) ? cloneElement(children, fieldProps(children.props)) : children}
      </View>
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
  }
});


export default FormItem;
