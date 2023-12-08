import { FC, PropsWithChildren, useCallback } from "react";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Typography from "@/components/Typography";

interface FeedbackCardProps {
  data?: API.Product;
}

const FeedbackCard: FC<FeedbackCardProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography.Title level={4}>评价</Typography.Title>
        <Typography.Text size="small" type="secondary">暂无评价</Typography.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  header: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})

export default FeedbackCard;
