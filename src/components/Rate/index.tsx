import { ViewProps } from "react-native";
import { useControllableValue } from "@/hooks";
import Space from "../Space";
import Icon from "../Icon";
import Link from "../Link";

interface RateProps extends ViewProps {
  value?: number;
  count?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

const Rate = (props: RateProps) => {
  const { count = 5, readOnly, ...restProps } = props;
  const [state, setState] = useControllableValue(props);

  return (
    <Space {...restProps}>
      {Array.from({ length: count }).map((_, index) => {
        const isChecked = index <= state - 1;
        return (
          <Link key={index} onPress={() => {
            if (!readOnly) {
              setState(index + 1);
            }
          }}>
            <Icon size={10} icon={isChecked ? 'star' : 'starGrey'} />
          </Link>
        )
      })}
    </Space>
  )
}

export default Rate;
