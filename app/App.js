import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux'
import store from './stores'
import Home from './views/home'
import Sudoku from './views/sudoku'
import Finish from './views/finish'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

let customFonts = ({
  'ArcadeClassic': require('./assets/fonts/arcadeClassic.ttf'),
});

const Stack = createStackNavigator();
export default function App() {
  [isReady, setIsReady] = useState(false)
  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFontsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    ); 
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Play" component={Sudoku} />
            <Stack.Screen name="Finish" component={Finish} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
