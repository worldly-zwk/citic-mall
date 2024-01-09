import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Typography, HorizontalProductList } from "@/components";
import { convertProduct } from "@/utils/convert";

interface SuggestCardProps {
  data?: API.Product[];
}

const SuggestCard: FC<SuggestCardProps> = ({ data }) => {
  const items = useMemo(() => {
    if (Array.isArray(data)) {
      return data.map(convertProduct);
    }

    return [];
  }, [data]);

  return (
    <View style={styles.container}>
      <Typography.Title level={4} style={styles.title}>同类推荐</Typography.Title>
      <HorizontalProductList style={styles.list} items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingBottom: 16,
  },
  title: {
    paddingLeft: 12,
    paddingVertical: 18,
  },
  list: {
    paddingHorizontal: 12
  }
})

export default SuggestCard;
