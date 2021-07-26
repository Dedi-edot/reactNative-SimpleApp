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

const Comments = props => {
  return (
    <View style={{...styles.mainContainer}}>
      <Text>Comments Screens</Text>
      <TouchableOpacity
        style={{...styles.navBtn}}
        onPress={() => props.navigation.navigate('MainStack')}>
        <Text>Tap To Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Comments;
