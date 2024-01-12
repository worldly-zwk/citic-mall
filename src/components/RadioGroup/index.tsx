import { Key, useMemo } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useControllableValue } from "@/hooks";
import Typography from "../Typography";
import Space from "../Space";

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  round?: boolean;
  value?: Key;
  onChange?: (value: Key) => void;
  options: string[] | RadioOption[];
}

const RadioGroup = (props: RadioGroupProps) => {
  const { options } = props;
  const [activeKey, setActiveKey] = useControllableValue<Key>(props);

  const items = useMemo(() => {
    if (Array.isArray(options)) {
      return options.map(option => {
        if (typeof option === 'string') {
          return { label: option, value: option }
        }
        return option;
      });
    }

    return [];
  }, [options]);

  return (
    <View style={styles.container}>
      {items.map(({ label, value }) => {
        const checked = activeKey === value;
        return  (
          <TouchableWithoutFeedback key={value} onPress={() => {
            if (activeKey !== value) {
              setActiveKey(value);
            }
          }}>
            <Space size={8} align="center">
              <Image style={styles.radio} source={checked ? require('@/assets/images/icons/checkbox-checked.png') : require('@/assets/images/icons/checkbox.png')} />
              {label && (
                <Typography.Text>{label}</Typography.Text>
              )}
            </Space>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radio: {
    width: 24,
    height: 24,
  },
});

export default RadioGroup;
