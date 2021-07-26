/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Home from '../screens/Home';
// import UserProfile from '../screens/UserProfile';
// import Comments from '../screens/Comments';
import MainStack from './MainStack';
import TopTabNav from './TopTabNav';
import Ionicons from 'react-native-vector-icons/';

const BottomTab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => {
        // return {
        //   tabBarIcon: ({focused, color, size}) => {
        //     let iconName;
        //     if (route.name === 'MainStack') {
        //       iconName = focused ? 'planet' : 'home';
        //     } else if (route.name === 'Comments') {
        //       iconName = focused ? 'chatbubbles' : 'quote';
        //     }
        //     return <Ionicons name={iconName} color={color} size={size} />;
        //   },
        // };
        // return {
        //   tabBarIcon: ({color, size}) => {
        //     let iconName;
        //     if (route.name === 'MainStack') {
        //       iconName = 'home';
        //     } else if (route.name === 'Comments') {
        //       iconName = 'chatbubbles';
        //     }
        //     return <Ionicons name={iconName} color={color} size={size} />;
        //   },
        // };
        return {
          tabBarIcon: () => {
            let iconName;
            if (route.name === 'MainStack') {
              iconName = 'home';
            } else if (route.name === 'Comments') {
              iconName = 'chatbubbles';
            }
            return <Ionicons name={iconName} />;
          },
        };
      }}
      tabBarOptions={{activeTintColor: 'blue'}}>
      {/* <BottomTab.Screen component={Home} name="Home" />
      <BottomTab.Screen component={UserProfile} name="UserProfile" /> */}
      <BottomTab.Screen
        component={MainStack}
        name="MainStack"
        options={{title: 'Home'}}
      />
      <BottomTab.Screen component={TopTabNav} name="Comments" />
    </BottomTab.Navigator>
  );
};

export default MainTab;
