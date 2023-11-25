import { NavigationContainer } from '@react-navigation/native';
import NavigatorScreen from './src/navigation';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <NavigatorScreen />
    </NavigationContainer>
  );
}

export default App;
