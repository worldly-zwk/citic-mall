import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Typography from "@/components/Typography";
import ScrollProductList from "@/components/ScrollProductList";
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
      <ScrollProductList items={items} />
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
  }
})

export default SuggestCard;
