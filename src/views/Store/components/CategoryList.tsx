
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { Card, Icon, Link, Typography } from '@/components';

interface CategoryListProps extends Omit<ScrollViewProps, 'id'> {
  id: number;
  items?: API.SellerCate[];
}

const CategoryList = (props: CategoryListProps) => {
  const { id, items, contentContainerStyle } = props;

  const renderCateChild = (childs: API.SellerCate[]) => {
    return (
      <View style={styles.childs}>
        {childs.map(({ id: cateId, name }) => (
          <Link style={styles.childItem} key={cateId} to={{ screen: 'StoreSearchList', params: { id, cateId } }}>
            <Typography.Text size="small">{name}</Typography.Text>
          </Link>
        ))}
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, contentContainerStyle]}>
      {items?.map(({ id: cateId, name, childs }) => {
        return (
          <Card contentStyle={{ padding: 10 }} key={cateId}>
            <Link style={styles.name} to={{ screen: 'StoreSearchList', params: { id, cateId  } }}>
              <Typography.Text>{name}</Typography.Text>
              <Icon size={12} icon="arrow" />
            </Link>
            {!!childs.length && renderCateChild(childs)}
          </Card>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    rowGap: 10,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childs: {
    flexDirection: 'row',
    rowGap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  childItem: {
    width: '49%',
    borderRadius: 2,
    paddingVertical: 7,
    backgroundColor: '#eee',
    alignItems: 'center',
  }
})

export default CategoryList;
