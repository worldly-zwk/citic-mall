import RNFS, { UploadFileItem } from 'react-native-fs';
import { Asset } from 'react-native-image-picker';
import { MEMBER, baseUrl } from '@/services';

export function uploadFiles(files: UploadFileItem[]) {
  return RNFS.uploadFiles({
    files,
    toUrl: `${baseUrl}/${MEMBER.upload}`,
    method: 'POST',
  }).promise.then((response) => {
    console.log(response);
    if (response.statusCode == 200) {
      return JSON.parse(response.body);
    } else {
      console.log('SERVER ERROR');
    }
  })
  .catch((err) => {
    if(err.description === "cancelled") {
      // cancelled by user
    }
    console.log(err);
  })
}

export function uploadPicture(asset: Asset) {
  return uploadFiles([
    {
      name: 'fileImg',
      filename: asset.fileName as string,
      filepath: asset.uri?.replace('file://', '') as string,
      filetype: asset.type as string,
    }
  ])
}
