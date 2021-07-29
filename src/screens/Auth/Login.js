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
} from 'react-native';
import {useDispatch} from 'react-redux';

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
    AsyncStorage.setItem('username', loginForm.username)
      .then(() => {
        dispatch({
          type: 'LOGIN_BTN_HANDLER',
          payload: loginForm.username,
        });
      })
      .catch(() => {
        console.log('error');
      });
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
