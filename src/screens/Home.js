/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

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
  const dispatch = useDispatch();
  // const globalState = useSelector(state => {
  //   return {
  //     auth: state.auth,
  //     todo: state.todo,
  //   };
  // });
  const globalAuth = useSelector(state => state.auth);
  const globalTodo = useSelector(state => state.todo);
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
    <View style={{...styles.mainContainer}}>
      <Text>Home Screens</Text>
      <Text>User Name: {globalAuth.username}</Text>
      <Text>Todo Count: {globalTodo.todoCount}</Text>
      <TouchableOpacity style={{...styles.btn}} onPress={logoutBtnHandler}>
        <Text>Logout</Text>
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
