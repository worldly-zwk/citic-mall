import { StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ToolBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ToolBar;
   