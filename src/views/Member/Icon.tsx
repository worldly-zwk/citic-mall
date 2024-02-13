import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Typography from '@/components/Typography';
import { Badge, Link, LinkProps } from '@/components';

interface CardProps extends LinkProps {
  label: string;
  image: ImageSourcePropType;
  count?: number;
  badge?: boolean;
  showCount?: boolean;
}

const GridIcon = ({ label, image, count, badge, showCount = true, ...restProps }: CardProps) => {
  return (
    <Link style={styles.icon} auth {...restProps}>
      {badge ? (
        <Badge count={count} offset={[-2, -2]}>
          <Image style={styles.image} source={image} />
        </Badge>
      ) : (
        <Image style={styles.image} source={image} />
      )}
      
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
   