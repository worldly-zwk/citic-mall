import { FC, ReactNode, cloneElement, isValidElement, useRef } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

export interface TabsPanelProps {
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  forceRender?: boolean;
  children?: ReactNode;
}

const TabPanel: FC<TabsPanelProps> = (props) => {
  const { visible, children, forceRender, style, ...restProps } = props;
  const visibleRef = useRef(visible);

  if (visible) {
    visibleRef.current = true;
  }

  let childNode: ReactNode;

  if (isValidElement<ViewProps>(children)) {
    if (visibleRef.current) {
      childNode = cloneElement(children);
    } else if (forceRender) {
      childNode = cloneElement(children);
    }
  }

  return (
    <View style={[style, { display: visible ? 'flex' : 'none' }]} {...restProps}>
      {childNode}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  }
});

export default TabPanel;
