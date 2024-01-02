import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigatorScreen from '@/navigation';
import { useMember } from '@/store';

function App(): JSX.Element {
  const init = useMember(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <NavigatorScreen />
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaProvider>
    
  );
}

export default App;
