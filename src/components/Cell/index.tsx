import { ImageSourcePropType, StyleSheet, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
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
  contentStyle?: ViewStyle;
}

const Cell = (props: CellProps) => {
  const { to, label, labelStyle, style, prefix, isLink, children, contentStyle, ...restProps } = props;

  return (
    <Link style={[styles.container, style]} to={to}>
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
    columnGap: 8,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
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
    alignContent: 'flex-end',
    justifyContent: 'center',
  },
});

Cell.Group = CellGroup;

export default Cell;
