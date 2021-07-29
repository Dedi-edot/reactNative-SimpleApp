/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Axios from 'axios';

const API_URL = 'http://10.0.2.2:2000';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  btnSend: {
    backgroundColor: 'pink',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginVertical: 16,
    width: 90,
    alignItems: 'center',
  },
  btnProfile: {
    backgroundColor: 'lightblue',
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
  input: {
    backgroundColor: 'lightblue',
    width: '72%',
    marginRight: 16,
    borderRadius: 10,
  },
});

const Home = props => {
  const [userList, setUserList] = useState([]);
  const [isRefreshing, setIsrefreshing] = useState(false);
  const [userInput, setUserInput] = useState('');

  const fetchData = () => {
    Axios.get(`${API_URL}/users`)
      .then(result => {
        setUserList(result.data);
      })
      .catch(() => {
        console.log('error');
      });
  };

  const refreshHandler = () => {
    setIsrefreshing(true);
    Axios.get(`${API_URL}/users`)
      .then(result => {
        setUserList(result.data);
        setIsrefreshing(false);
      })
      .catch(() => {
        console.log('error');
        setIsrefreshing(false);
      });
  };

  const renderUsersList = ({item}) => {
    return (
      <View style={{...styles.renderList}}>
        <Text>{item.username}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.push('UserProfile', item)}
          style={{...styles.btnProfile}}>
          <Text>Go To Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const inputHandler = text => {
    setUserInput(text);
  };

  const sendBtnHandler = () => {
    Axios.post(`${API_URL}/users`, {
      username: userInput,
    })
      .then(res => {
        refreshHandler();
        setUserInput('');
      })
      .catch(() => {
        console.log('error');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{...styles.mainContainer}}>
      <View style={{...styles.inputView}}>
        <TextInput
          placeholder="Input here"
          onChangeText={inputHandler}
          style={{...styles.input}}
          value={userInput}
        />
        <TouchableOpacity style={{...styles.btnSend}} onPress={sendBtnHandler}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={userList}
        renderItem={renderUsersList}
        style={{...styles.flatListContainer}}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshHandler}
          />
        }
      />
      <Ionicons name="home" size={24} />
    </View>
  );
};

export default Home;
