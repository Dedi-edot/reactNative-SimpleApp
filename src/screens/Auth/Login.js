/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    paddingLeft: 16,
    paddingTop: 10,
    marginTop: 10,
  },
});

const Login = props => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const inputHandler = (field, value) => {
    setLoginForm({
      ...loginForm,
      [field]: value,
    });
  };

  const loginBtnHandler = () => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username: loginForm.username,
        password: loginForm.password,
      },
    })
      .then(res => {
        if (res.data.length) {
          AsyncStorage.setItem('username', loginForm.username)
            .then(() => {
              AsyncStorage.setItem(
                'interceptorsId',
                Axios.interceptors.request
                  .use(requestHeader => {
                    requestHeader.headers['LOG-IN-USER'] = res.data[0].username;
                    return requestHeader;
                  })
                  .toString(),
              )
                .then(() => {
                  dispatch({
                    type: 'LOGIN_BTN_HANDLER',
                    payload: res.data[0].username,
                  });
                })
                .catch(() => {
                  console.log('AsyncStorage Interceptors Error');
                });
            })
            .catch(() => {
              console.log('error');
            });
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show(
              'Username or Password Invalid',
              ToastAndroid.SHORT,
            );
          } else {
            Alert.alert('Username or Password Invalid');
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    //
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...styles.mainContainer}}>
        <View>
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
            onPress={loginBtnHandler}
            style={{...styles.btnLogin}}>
            <Text style={{color: 'white'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Register')}
            style={{marginTop: 16, alignSelf: 'center'}}>
            <Text>Register for new Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
