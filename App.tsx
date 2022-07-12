import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './src/navigation/MyStack';
import {GradientProvider} from './src/context/GradientContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const AppState = ({children}: any) => {
  return <GradientProvider>{children}</GradientProvider>;
};

export const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppState>
          <MyStack />
        </AppState>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
