import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootStackParamList } from '@/typings/screen';
import Typography from '../Typography';
import CellGroup from './CellGroup';
import Link from '../Link';

interface CellProps extends ViewProps {
  label: string;
  prefix?: ImageSourcePropType;
  isLink?: boolean;
  to?: NavigatorScreenParams<RootStackParamList>
}

const Cell = (props: CellProps) => {
  const { to, label, style, prefix, isLink, children, ...restProps } = props;

  return (
    <Link style={[styles.container, style]} to={to}>
      {prefix && (
        <Image style={styles.icon} source={prefix} />
      )}
      <View style={styles.cell} {...restProps}>
        <View style={styles.label}>
          <Typography.Text>{label}</Typography.Text>
        </View>
        <View style={styles.content}>
          {children}
        </View>
      </View>
      {isLink && (
        <Image style={styles.icon} source={require('@/assets/images/icons/arrow.png')} />
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
  icon: {
    width: 16,
    height: 16,
  },
  label: {
    paddingVertical: 2,
  },
  content: {
    flex: 1,
  },
});

Cell.Group = CellGroup;

export default Cell;
