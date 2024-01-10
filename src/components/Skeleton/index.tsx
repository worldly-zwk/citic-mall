import { PropsWithChildren, useEffect, useMemo } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { isBoolean } from '@/utils';

interface SkeletonAvatar {
  size?: number;
  circle?: boolean;
}

interface SkeletonText {
  rows: number;
  width?: number | number[];
}

interface SpaceProps extends PropsWithChildren {
  loading?: boolean;
  text?: SkeletonText | boolean;
  avatar?: SkeletonAvatar | boolean;
  style?: StyleProp<ViewStyle>;
}

const Skeleton = (props: SpaceProps) => {
  const { loading, style, children, text = true, avatar, ...restProps } = props;
  const opacity = useMemo(() => new Animated.Value(1), []);

  const skeletonText = useMemo(() => {
    if (isBoolean(text)) {
      return { rows: text ? 1 : 0 }
    }

    return text;
  }, [text]);

  const avatarStyle = useMemo<ViewStyle | undefined>(() => {
    if (avatar && !isBoolean(avatar)) {
      const { size = 60, circle } = avatar;
      return { width: size, height: size, borderRadius: circle ? size : undefined }
    }

    return undefined;
  }, [avatar]);

  useEffect(() => {
    const animated = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    if (loading) {
      animated.start();
    }
    return () => {
      animated.stop();
    }
  }, [loading]);

  if (loading) {
    return (
      <Animated.View style={[styles.container, style, { opacity }]} {...restProps}>
        {avatar && (
          <View style={[styles.avatar, avatarStyle]} />
        )}
        {skeletonText.rows && (
          <View style={styles.content}>
            {Array.from({ length: skeletonText.rows }).map((_, index) => (
              <View style={styles.text} key={index} />
            ))}
          </View>
        )}
      </Animated.View>
    )
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    columnGap: 12,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    gap: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#f2f3f5'
  },
  text: {
    height: 14,
    backgroundColor: '#f2f3f5'
  }
})

export default Skeleton;
   