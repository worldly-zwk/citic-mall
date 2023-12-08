import Typography from "@/components/Typography";
import { ReactNode } from "react";
import { Image, StyleSheet, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  title: string;
  extra?: ReactNode;
}

const Card = ({ title, extra, children }: CardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography.Text>{title}</Typography.Text>
        {extra}
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  header: {
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  body: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
  }
})

export default Card;
   