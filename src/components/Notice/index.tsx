import { ReactNode } from 'react';
import { Image, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '../Typography';

interface NoticeProps extends ViewProps {
  extra?: ReactNode;
}

const Notice = ({ extra, children, ...restProps }: NoticeProps) => {
  return (
    <View style={styles.notice} {...restProps}>
      <Image style={styles.icon} source={require('@/assets/images/icons/warning.png')} />
      <Typography.Text style={styles.text} size="small" primary>{children}</Typography.Text>
      <View style={styles.extra}>
        {extra}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  notice: {
    height: 40,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    backgroundColor: '#fef5e6',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  text: {
    flex: 1,
    lineHeight: 16,
  },
  extra: {
    marginLeft: 6
  }
});

export default Notice;
