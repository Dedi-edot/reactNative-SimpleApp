/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import {useSelector, useDispatch} from 'react-redux';
import MainTab from './MainTab';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const globalAuth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const checkAuth = () => {
    AsyncStorage.getItem('username')
      .then(value => {
        dispatch({
          type: 'CHANGE_USER_NAME',
          payload: value,
        });
      })
      .catch(() => {
        console.log('Error');
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      {globalAuth.username ? (
        <Stack.Screen component={MainTab} name="MainTab" />
      ) : (
        <>
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Register} name="Register" />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
