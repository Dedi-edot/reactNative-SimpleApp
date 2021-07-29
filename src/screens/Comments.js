/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'lightblue',
  },
  navBtn: {
    backgroundColor: 'pink',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginTop: 16,
    marginHorizontal: 16,
  },
});

const Comments = props => {
  const globalAuth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const changeUserName = () => {
    const newUsername = 'Bowy';
    AsyncStorage.setItem('username', newUsername)
      .then(() => {
        dispatch({
          type: 'CHANGE_USER_NAME',
          payload: newUsername,
        });
      })
      .catch(() => {
        console.log('Error');
      });
  };

  const storageUser = () => {
    AsyncStorage.getItem('username')
      .then(value => {
        dispatch({
          type: 'CHANGE_USER_NAME',
          payload: value,
        });
      })
      .catch(() => {
        console.log('error');
      });
  };

  const removeValue = () => {
    AsyncStorage.removeItem('username').catch(() => {
      console.log('Error');
    });
  };

  useEffect(() => {
    storageUser();
  }, []);
  return (
    <View style={{...styles.mainContainer}}>
      <Text>All Comments Screens</Text>
      <Text>User Name: {globalAuth.username} </Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={changeUserName} style={{...styles.navBtn}}>
          <Text>Change Global State</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeValue} style={{...styles.navBtn}}>
          <Text>Remove User Storage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
