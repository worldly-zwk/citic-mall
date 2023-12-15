import { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import SearchBar from '@/components/SearchBar';
import Typography from '@/components/Typography';
import { SearchScreenProps } from '@/typings/screen';
import Section from './Section';
import SuggestPanel from './SuggestPanel';


const Search = ({ navigation }: SearchScreenProps) => {
  const [value, setValue] = useState('');
  const [state] = useRequest(PRODUCT.keyword, {
    defaultParams: {
      channel: 2,
      showPosition: 1
    },
    formatResult: (data: API.SearchKeyword[]) => data?.map(({ keyword }) => keyword)
  });

  const [logState] = useRequest(PRODUCT.logs, {
    defaultParams: {
      channel: 2,
      showPosition: 1
    },
    formatResult: (data: API.SearchKeyword[]) => data?.map(({ keyword }) => keyword),
  });

  const [suggestState, actions] = useRequest<string[], { keyword: string }>(PRODUCT.suggests, {
    manual: true,
    debounceWait: 600,
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        editable
        extra={(
          <TouchableWithoutFeedback onPress={navigation.goBack}>
            <Typography.Text type="secondary">取消</Typography.Text>
          </TouchableWithoutFeedback>
        )}
        onChangeText={(text) => {
          setValue(text);
          actions.run({ keyword: text });
        }}
      />
      <View style={styles.main}>
        <Section title="热门推荐" items={state.data} />
        <Section title="搜索历史" items={logState.data} />
        <SuggestPanel open={!!value} value={value} items={suggestState.data} onPressStore={console.log} onPress={console.log} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    flex: 1,
  },
});

export default Search;
