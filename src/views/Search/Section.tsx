import Typography from '@/components/Typography';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface SearchSectionProps {
  title: string;
  items?: string[];
  onPressCapsule?: (value: string) => void;
}


const Section = ({ title, items, onPressCapsule }: SearchSectionProps) => {
  if (items?.length) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography.Text style={styles.title}>{title}</Typography.Text>
        </View>
        <View style={styles.main}>
          {items?.map((text, index) => (
            <TouchableWithoutFeedback key={`${text}_${index}`} onPress={() => onPressCapsule?.(text)}>
              <View style={styles.capsule}>
                <Typography.Text size="small">{text}</Typography.Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    )
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    lineHeight: 22,
    paddingVertical: 12,
  },
  icon: {
    width: 18,
    height: 18,
    marginHorizontal: 12
  },
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  capsule: {
    borderRadius: 28,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f5f6fa',
    marginRight: 12,
    marginBottom: 12,
  }
});

export default Section;
