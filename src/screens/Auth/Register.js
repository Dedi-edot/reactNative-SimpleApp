/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:2000';

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: 'lightblue',
  },
  inputType: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 2,
    marginBottom: 8,
  },
  btnLogin: {
    backgroundColor: 'navy',
    borderRadius: 8,
    width: 70,
    height: 40,
    alignSelf: 'center',
    paddingLeft: 8,
    paddingTop: 10,
    marginTop: 10,
  },
});

const Register = () => {
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
  });

  const inputHandler = (field, value) => {
    setRegisterForm({
      ...registerForm,
      [field]: value,
    });
  };

  const registerBtnHandler = () => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username: registerForm.username,
      },
    })
      .then(res => {
        if (!res.data.length) {
          Axios.post(`${API_URL}/users`, {
            username: registerForm.username,
            password: registerForm.password,
          })
            .then(() => {
              AsyncStorage.setItem('username', registerForm.username)
                .then(() => {
                  dispatch({
                    type: 'CHANGE_USER_NAME',
                    payload: registerForm.username,
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Username has been used', ToastAndroid.SHORT);
          } else {
            Alert.alert('Username has been used');
          }
          // ToastAndroid.show('Username has been used', ToastAndroid.SHORT);
          // Alert.alert('Username has been used');
        }
      })
      .catch();
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...styles.mainContainer}}>
        <Text>Username</Text>
        <TextInput
          onChangeText={text => inputHandler('username', text)}
          style={{...styles.inputType}}
          placeholder="Your Username"
        />
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          onChangeText={text => inputHandler('password', text)}
          style={{...styles.inputType}}
          placeholder="Your Username"
        />
        <TouchableOpacity
          onPress={registerBtnHandler}
          style={{...styles.btnLogin}}>
          <Text style={{color: 'white'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
