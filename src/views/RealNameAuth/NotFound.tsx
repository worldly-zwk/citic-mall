import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, Button, Empty, Typography, Popup, Space } from "@/components";
import { useBoolean } from "@/hooks";
import { AUTH_RULES } from "@/constants";

interface NotFoundProps {
  onEdit?: () => void;
}

const NotFound = (props: NotFoundProps) => {
  const insets = useSafeAreaInsets();
  const [visible, actions] = useBoolean(false);

  return (
    <Empty
      style={styles.container}
      title="您还没有实名认证"
      image={require('@/assets/images/empty/auth.png')}
      description={`为了能够顺利的购买跨境商品\n请添加一个吧`}
    >
      <View style={[styles.main, { paddingBottom: insets.bottom + 98 }]}>
        <Button to={{ screen: 'RealNameAuthForm' }}>添加实名认证</Button>
        <Link style={styles.link} onPress={actions.setTrue}>
          <Typography.Text color="#4dafea" size="small">了解实名认证</Typography.Text>
        </Link>
      </View>
      <Popup title="为什么要进行实名认证" visible={visible} bodyStyle={{ rowGap: 12 }} onClose={actions.setFalse}>
        {AUTH_RULES.map((text, index) => (
          <Space size={8} key={index}>
            <Typography.Text size="small" color="secondary" style={styles.text}>{index + 1}、</Typography.Text>
            <View style={{ flex: 1 }}>
              {text.split('\n').map((text, index) => (
                <Typography.Text size="small" color="secondary" style={styles.text} key={index}>{text}</Typography.Text>
              ))}
            </View>
          </Space>
        ))}
      </Popup>
    </Empty>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  main: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 55,
  },
  link: {
    marginTop: 84,
    alignItems: 'center',
  },
  text: {
    lineHeight: 20,
  }
})

export default NotFound;
   