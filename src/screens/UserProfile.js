/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBtn: {
    backgroundColor: 'pink',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

const UserProfile = props => {
  const routeParams = props.route.params;
  return (
    <View style={{...styles.mainContainer}}>
      <Text>UserProfile Screens</Text>
      <Text>User ID: {routeParams.id}</Text>
      <Text>User Name: {routeParams.username}</Text>
      <TouchableOpacity
        style={{...styles.navBtn}}
        onPress={() => props.navigation.navigate('Comments')}>
        <Text>Tap To Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
