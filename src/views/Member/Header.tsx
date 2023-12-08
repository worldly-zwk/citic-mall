import { Image, ImageBackground, ImageSourcePropType, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '@/components/Typography';
import { useMemo } from 'react';

interface CardProps extends ViewProps {
  userInfo?: any;
}

const Header = ({ userInfo }: CardProps) => {
  const avatar = useMemo(() => {
    return require('@/assets/images/view/default_avatar.png');
  }, []);

  return (
    <ImageBackground style={styles.container} source={require('@/assets/images/view/user_mask.png')} resizeMode="stretch">
      <View style={styles.info}>
        <Image style={styles.avatar} source={avatar} />
        <Typography.Text style={styles.name} size="large">登录/注册</Typography.Text>
      </View>
      <View style={styles.actions}>
        <Image style={styles.icon} source={require('@/assets/images/icons/setting.png')} />
        <Image style={styles.icon} source={require('@/assets/images/icons/message-white.png')} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    paddingTop: 88,
  },
  actions: {
    position: 'absolute',
    right: 15,
    top: 54,
    flexDirection: 'row',
    columnGap: 15
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    marginLeft: 15,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 56,
  },
  name: {
    color: '#fff'
  },
  icon: {
    width: 24,
    height: 24,
  }
})

export default Header;
   