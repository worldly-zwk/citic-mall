import { isValidElement } from "react";
import { TouchableWithoutFeedback, ViewProps } from "react-native";
import Typography from "../Typography";
import Space from "../Space";
import Icon from "../Icon";

export interface RadioProps extends ViewProps {
  checked?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const Radio = (props: RadioProps) => {
  const { checked, onPress, children, ...restProps } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Space size={8} align="center" {...restProps}>
        <Icon size={24} icon={checked ? 'radioChecked' : 'radio'} />
        {children && (isValidElement(children) ? children : <Typography.Text>{children}</Typography.Text>)}
      </Space>
    </TouchableWithoutFeedback>
  )
}

export default Radio;
