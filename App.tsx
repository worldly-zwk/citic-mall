import { NavigationContainer } from '@react-navigation/native';
import NavigatorScreen from './src/navigation';
import { useMember } from '@/store';
import { useEffect } from 'react';

function App(): JSX.Element {
  const init = useMember(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer>
      <NavigatorScreen />
    </NavigationContainer>
  );
}

export default App;
