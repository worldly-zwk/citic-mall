import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface NavProps {
  items?: API.HomeChannel[];
}

const Nav: FC<NavProps> = ({ items }) => {
  if (Array.isArray(items) && items.length) {
    return (
      <View style={styles.wrapper}>
        {items.map(({ title, image }, index) => (
          <View style={styles.icon} key={`${index}-${title}`}>
            <Image style={styles.image} source={{ uri: image }} />
            <Text style={styles.label}>{title}</Text>
          </View>
        ))}
      </View>
    )
  }
  
  return null
}

const styles = StyleSheet.create({
  wrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    paddingTop: 10,
  },
  icon: {
    width: '20%',
    marginBottom: 10,
    alignContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40
  },
  label: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4
  }
})

export default Nav;
