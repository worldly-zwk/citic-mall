import { useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Link, { LinkProps } from '../Link';
import Alert from '../Alert';

interface UploadPictureProps extends LinkProps {

}

const UploadPicture = (props: UploadPictureProps) => {
  const { onPress,  ...restProps } = props;

  const handlePress = useCallback((e: GestureResponderEvent) => {
    Alert.actionSheet({
      buttons: [
        {
          key: 'takePhoto',
          text: '拍照',
          
        },
        {
          key: 'albums',
          text: '从手机相册选择',
        },
      ],
    }, value => {
      if (value === 'takePhoto') {
        launchCamera({
          mediaType: 'photo',
        }, console.log);
      } else {
        launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1,
        }, console.log)
      }
    });
    onPress?.(e);
  }, []);

  return (
    <Link {...restProps} onPress={handlePress} />
  )
}

export default UploadPicture;
