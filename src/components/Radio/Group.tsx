import { Key, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useControllableValue } from "@/hooks";
import Radio from "./Radio";
import RadioButton from "./Button";

interface RadioOption {
  label: string;
  value: Key;
  disabled?: boolean;
}

interface RadioGroupProps {
  value?: Key;
  onChange?: (value: Key) => void;
  options: string[] | RadioOption[];
  optionType?: 'default' | 'button';
  buttonRound?: boolean;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { options, optionType = 'default', buttonRound } = props;
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

  // console.log(props, activeKey);

  return (
    <View style={styles.container}>
      {items.map(({ label, value }, index) => {
        const checked = activeKey === value;
        const handlePress = () => {
          if (activeKey !== value) {
            setActiveKey(value);
          }
        }

        if (optionType === 'button') {
          return <RadioButton checked={checked} onPress={handlePress} round={buttonRound} key={value}>{label}</RadioButton>
        }

        return <Radio checked={checked} onPress={handlePress} key={value}>{label}</Radio>
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
