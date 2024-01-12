import { FC } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "@/components/IconButton";
import Button from "@/components/Button";
import { AddCartMode, ProductScreenProps } from "@/typings";
import { useNavigation } from "@react-navigation/native";

interface ToolbarProps {
  data?: API.ProductInfo;
  navigation?: ProductScreenProps['navigation'];
  onSubmit?: (mode: AddCartMode) => void;
}

const Toolbar: FC<ToolbarProps> = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <IconButton style={styles.borderd} icon={require('@/assets/images/icons/cart.png')}>购物车</IconButton>
        <IconButton style={styles.borderd} icon={require('@/assets/images/icons/help-hands.png')}>客服</IconButton>
        <IconButton icon={require('@/assets/images/icons/bookmark.png')}>收藏</IconButton>
      </View>
      <Button.Group>
        <Button onPress={() => onSubmit?.(AddCartMode.ADD)}>加入购物车</Button>
        <Button onPress={() => onSubmit?.(AddCartMode.BUY)} linearGradient={{ colors: ['#ff680d', '#e65321'] }}>立即购买</Button>
      </Button.Group>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 49,
    flexDirection: 'row',
  },
  icons: {
    flexDirection: 'row'
  },
  borderd: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#eee',
  },
})

export default Toolbar;
