/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
// import {useColorScheme} from 'react-native';

import RootStack from './src/screens';
import {UserConfigProvider} from './src/context/userConfigs.context';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  // const safePadding = '5%';

  return (
    <NavigationContainer>
      <UserConfigProvider>
        <RootStack />
      </UserConfigProvider>
    </NavigationContainer>
  );
}

export default App;
