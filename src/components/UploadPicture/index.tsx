import { useCallback } from 'react';
import { GestureResponderEvent } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { toast, uploadPicture } from '@/utils';
import Link, { LinkProps } from '../Link';
import Alert from '../Alert';

interface UploadPictureProps extends LinkProps {
  onFinish?: (data: API.UploadResponse) => void | Promise<any>;
}

const UploadPicture = (props: UploadPictureProps) => {
  const { onPress, onFinish,  ...restProps } = props;

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
        }, response => {
          if (Array.isArray(response.assets)) {
            const destroy = Alert.loading();
            const [asset] = response.assets;

            uploadPicture(asset).then((body) => {
              if (body.success) {
                return onFinish?.(body.data);
              } else {
                toast(body.message);
              }
            }).finally(destroy);
          } else if(response.errorCode) {
            toast(response.errorCode);
          }
        });
      } else {
        launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1,
        }, response => {
          if (Array.isArray(response.assets)) {
            const destroy = Alert.loading();
            const [asset] = response.assets;

            uploadPicture(asset).then((body) => {
              if (body.success) {
                return onFinish?.(body.data);
              } else {
                toast(body.message);
              }
            }).finally(destroy);
          } else if(response.errorCode) {
            toast(response.errorCode);
          }
        })
      }
    });
    onPress?.(e);
  }, []);

  return (
    <Link {...restProps} onPress={handlePress} />
  )
}

export default UploadPicture;
