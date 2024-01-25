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
  children?: string;
}

const Notice = (props: NoticeProps) => {
  const { extra, children, showIcon, closeIcon, ...restProps } = props;
  const [visible, actions] = useBoolean(true);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.notice} {...restProps}>
      {showIcon && (
        <Image style={styles.icon} source={require('@/assets/images/icons/warning.png')} />
      )}
      <View style={styles.text}>
        {children?.split('\n').map((text, index) => (
          <Typography.Text size="small" primary key={index}>{text}</Typography.Text>
        ))}
      </View>
      {(extra || closeIcon) && (
        <View style={styles.extra}>
          {closeIcon ? <Link onPress={actions.setFalse}><Icon icon="closedNotice" /></Link> : extra}
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
  },
  extra: {
    marginLeft: 6,
  }
});

export default Notice;
