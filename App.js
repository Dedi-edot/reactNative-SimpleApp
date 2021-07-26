import 'react-native-gesture-handler';
import React from 'react';
// import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import MainStack from './src/navigators/MainStack';
import MainTab from './src/navigators/MainTab';
// import TopTabNav from './src/navigators/TopTabNav';

const App = () => {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
};

export default App;
