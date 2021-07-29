/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import UserProfile from '../screens/UserProfile';
// import Comments from '../screens/Comments';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Timeline">
      <Stack.Screen component={Home} name="Timeline" />
      <Stack.Screen
        component={UserProfile}
        name="UserProfile"
        options={{title: 'User Profile'}}
      />
      {/* <Stack.Screen component={Comments} name="Comments" /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
