import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import NavigatorScreen from '@/navigation';
import { useMember } from '@/store';

function App(): JSX.Element {
  const init = useMember(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <NavigatorScreen />
      </NavigationContainer>
    </RootSiblingParent>
  );
}

export default App;
