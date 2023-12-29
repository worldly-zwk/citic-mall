import { GestureResponderEvent, ImageSourcePropType, StyleSheet, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList } from '@/typings/screen';
import Typography from '../Typography';
import CellGroup from './CellGroup';
import Link from '../Link';
import Icon from '../Icon';

interface CellProps extends ViewProps {
  label: string;
  labelStyle?: TextStyle;
  prefix?: ImageSourcePropType;
  isLink?: boolean;
  to?: NavigatorScreenParams<RootStackParamList>;
  onPress?: (event: GestureResponderEvent) => void;
  contentStyle?: ViewStyle;
}

const Cell = (props: CellProps) => {
  const { to, label, labelStyle, style, prefix, isLink = !!to, children, contentStyle, onPress, ...restProps } = props;

  return (
    <Link style={[styles.container, style]} to={to} onPress={onPress}>
      {prefix && (
        <Icon icon={prefix} />
      )}
      <View style={styles.cell} {...restProps}>
        <View style={styles.label}>
          <Typography.Text style={labelStyle}>{label}</Typography.Text>
        </View>
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </View>
      {isLink && (
        <Icon icon="arrow" />
      )}
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    columnGap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    rowGap: 12,
    flexDirection: 'row',
  },
  label: {
    paddingVertical: 2,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

Cell.Group = CellGroup;

export default Cell;
