import { View, ViewProps } from 'react-native';
import TypographyText from './Text';
import TypographyTitle from './Title';
import TypographyPrice from './Price';

interface TypographyProps extends ViewProps {

}

const Typography = (props: TypographyProps) => {
  return (
    <View {...props} />
  )
}

Typography.Text = TypographyText;
Typography.Title = TypographyTitle;
Typography.Price = TypographyPrice;

export default Typography;

