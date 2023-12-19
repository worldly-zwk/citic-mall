import { useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Typography from "../Typography";

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioButtonProps {
  options: string[] | RadioOption[];
}

const RadioButton = (props: RadioButtonProps) => {
  const { options } = props;
  const [activeKey, setActiveKey] = useState<string>();

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
        const isCurrent = activeKey === value;

        return  (
          <TouchableWithoutFeedback key={value} onPress={() => setActiveKey(value)}>
            <View style={[styles.radioButton, isCurrent ? styles.radioButtonActive : null]}>
              <Typography.Text primary={isCurrent}>{label}</Typography.Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButton: {
    backgroundColor: '#f5f6fa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 26,
    marginRight: 12,
    marginBottom: 12,
  },
  radioButtonActive: {
    borderWidth: 1,
    borderColor: '#e65321'
  }
});

export default RadioButton;
