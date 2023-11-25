import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScrollProductList from "@/components/ScrollProductList";

interface RecommendProps {
  items?: any[];
  title?: string;
}

const Recommend: FC<RecommendProps> = ({ title, items }) => {
  if (items?.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <ScrollProductList style={styles.content} horizontal items={items} />
      </View>
    )
  }
  
  return null;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
  },
  title: {
    color: '#333',
    fontSize: 18,
    lineHeight: 34,
  },
  content: {
    marginTop: 5
  },
})

export default Recommend;
