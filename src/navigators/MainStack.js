/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import UserProfile from '../screens/UserProfile';
import {useSelector, useDispatch} from 'react-redux';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  btnLogout: {
    height: 32,
    backgroundColor: 'pink',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginRight: 16,
  },
});

const Stack = createStackNavigator();

const MainStack = () => {
  const dispatch = useDispatch();
  const globalAuth = useSelector(state => state.auth);

  const logoutBtnHandler = () => {
    AsyncStorage.removeItem('username')
      .then(() => {
        dispatch({
          type: 'RESET_USERNAME',
        });
      })
      .catch(() => {
        console.log('error');
      });
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        component={Home}
        name="Home"
        options={{
          title: `Hello, ${globalAuth.username}`,
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{...styles.btnLogout}}
                onPress={logoutBtnHandler}>
                <Text>Logout</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        component={UserProfile}
        name="UserProfile"
        options={{title: 'User Profile'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
