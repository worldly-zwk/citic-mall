import { ReactNode } from 'react';
import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { useBoolean } from '@/hooks';
import Typography from '../Typography';
import Icon from '../Icon';
import Link from '../Link';

interface NoticeProps extends ViewProps {
  extra?: ReactNode;
  showIcon?: boolean;
  closeIcon?: boolean;
}

const Notice = (props: NoticeProps) => {
  const { extra, children, showIcon, closeIcon, ...restProps } = props;
  const [visible, setVisible] = useBoolean(true);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.notice} {...restProps}>
      {showIcon && (
        <Image style={styles.icon} source={require('@/assets/images/icons/warning.png')} />
      )}
      <Typography.Text style={styles.text} size="small" primary>{children}</Typography.Text>
      {(extra || closeIcon) && (
        <View style={styles.extra}>
          {closeIcon ? <Link onPress={setVisible}><Icon icon="closedNotice" /></Link> : extra}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  notice: {
    padding: 12,
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
    // height: '100%',
    marginLeft: 6,
    // backgroundColor: 'red'
  }
});

export default Notice;
