import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '@/components/Typography';
import { Link, LinkProps } from '@/components';

interface CardProps extends LinkProps {
  label: string;
  image: ImageSourcePropType;
  count?: string | number;
  showCount?: boolean;
}

const GridIcon = ({ label, image, count, showCount = true, ...restProps }: CardProps) => {
  return (
    <Link style={styles.icon} auth {...restProps}>
      <Image style={styles.image} source={image} />
      <Typography.Text style={styles.label} color="secondary">{label}</Typography.Text>
      {showCount && (
        <Typography.Text size="large" strong="500">{count || '--'}</Typography.Text>
      )}
    </Link>
  )
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  }
})

export default GridIcon;
   