import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Member = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Hello Member</Text>
      <Image source={{ width: 80, height: 80, uri: 'https://oss.citic-mall.com/oss/be9e60e5bc924b7681487129c610efc7.png' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

export default Member;
   