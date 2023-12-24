import { useMemo } from 'react';
import { Image, ImageBackground, ImageSourcePropType, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '@/components/Typography';
import Link from '@/components/Link';
import LinearGradient from 'react-native-linear-gradient';

interface CardProps extends ViewProps {
  member?: API.Member | null;
}

const Header = ({ member }: CardProps) => {
  const avatar = useMemo<ImageSourcePropType>(() => {
    if (member?.headPortrait) {
      return { uri: member?.headPortrait }
    }
    return require('@/assets/images/view/default_avatar.png');
  }, [member?.headPortrait]);

  const memberIcon = member?.authStaff === 1 ? require('@/assets/images/icons/citic.png') : require('@/assets/images/icons/diamond.png');

  return (
    <ImageBackground style={styles.container} source={require('@/assets/images/view/user_mask.png')} resizeMode="stretch">
      <Link style={styles.info}>
        <Image style={styles.avatar} source={avatar} />
        <Typography.Text style={styles.name} size="large">{member?.nickname || '登录/注册'}</Typography.Text>
        {member && (
          <LinearGradient style={styles.tag} colors={['#fff9f0', '#fff2e5']}>
            <Image style={styles.tagIcon} source={memberIcon} />
            {member?.authStaff === 1 ? (
              <View>
                <Typography.Text size="small" primary>中信员工</Typography.Text>
                <Typography.Text size="mini" primary>尊享内购权益</Typography.Text>
              </View>
            ) : (
              <Typography.Text size="small" primary>易家员工</Typography.Text>
            )}
          </LinearGradient>
        )}
      </Link>
      <View style={styles.actions}>
        <Link to={{ screen: 'Settings' }}>
          <Image style={styles.icon} source={require('@/assets/images/icons/setting.png')} />
        </Link>
        <Link to={{ screen: 'Settings' }}>
          <Image style={styles.icon} source={require('@/assets/images/icons/message-white.png')} />
        </Link>
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
  },
  tag: {
    position: 'absolute',
    borderTopStartRadius: 34,
    borderEndStartRadius: 34,
    top: 10,
    right: 0,
    height: 34,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tagIcon: {
    width: 22,
    height: 22,
    marginLeft: 6,
    marginRight: 8,
  }
})

export default Header;
   