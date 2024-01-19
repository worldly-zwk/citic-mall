import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigatorScreen from '@/navigation';
import { useMember } from '@/store';
import { navigationRef } from '@/utils/navigation';

function App(): JSX.Element {
  const init = useMember(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <NavigationContainer ref={navigationRef}>
          <NavigatorScreen />
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaProvider>
    
  );
}

export default App;
