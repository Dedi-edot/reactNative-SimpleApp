/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'pink',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  flatListContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  renderList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
});

const users = [
  {
    id: 1,
    username: 'Andi',
  },
  {
    id: 2,
    username: 'Bani',
  },
  {
    id: 3,
    username: 'Chika',
  },
];

const Home = props => {
  const renderUsersList = ({item}) => {
    return (
      <View style={{...styles.renderList}}>
        <Text>{item.username}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.push('UserProfile', item)}
          style={{...styles.btn, backgroundColor: 'lightblue'}}>
          <Text>Go To Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{...styles.mainContainer}}>
      <Text>Home Screens</Text>
      <TouchableOpacity
        style={{...styles.btn}}
        onPress={() =>
          props.navigation.push('UserProfile', {username: 'Selamat Datang'})
        }>
        <Text>Tap To Navigate</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        renderItem={renderUsersList}
        style={{...styles.flatListContainer}}
      />
      <Ionicons name="home" size={24} />
    </View>
  );
};

export default Home;
