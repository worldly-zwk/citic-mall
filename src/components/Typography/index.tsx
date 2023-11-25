import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import TypographyText from './Text';
import TypographyTitle from './Title';

interface TypographyProps extends PropsWithChildren {

}

const Typography = (props: TypographyProps) => {
  return (
    <View {...props} />
  )
}

Typography.Text = TypographyText;
Typography.Title = TypographyTitle;

export default Typography;

