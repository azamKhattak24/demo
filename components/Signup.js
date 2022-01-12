import React, { useState } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { initializeApp } from "firebase/app";

const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

const SignUpScreen = ({ navigation }) => {
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [admin, setAdmin] = useState('0');

  const makeUser = () =>{
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        UserName: name,
        Password: password,
        Email: email,
        Contact: phone,
        Admin: admin,     

      }),
      
    };
    fetch(`${FIREBASE_API_ENDPOINT}/Users.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    
    navigation.navigate('Login')
  }

  // onChangeText = (key, val) => {
  //   this.setState({ [key]: val })
  // }
  // signUp = async () => {
  //   const { username, password, email, phone_number } = this.state
  //   try {
  //     // here place your signup logic
  //     console.log('user successfully signed up!: ', success)
  //   } catch (err) {
  //     console.log('error signing up: ', err)
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.acnttxt}>Create Your New Account</Text>
      <Input
        style={styles.Input}
        placeholder="  Enter Your User Name"
        onChangeText={(x) => setname(x)}
        value={name}
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Input
        style={styles.Input}
        placeholder="  Enter Your Password"
        value={password}
        onChangeText={(x) => setpassword(x)}
        leftIcon={<Icon name="lock" size={24} color="black" />}
        secureTextEntry={true}
      />
      <Input
        style={styles.Input}
        placeholder="  Enter Your Email"
        onChangeText={(x) => setemail(x)}
        value={email}
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />
      <Input
        style={styles.Input}
        placeholder="  Enter Your Phone Number"
        onChangeText={(x) => setphone(x)}
        value={phone}
        leftIcon={<Icon name="key" size={24} color="black" />}
      />
      <TouchableOpacity
        onPress={() => makeUser()}
        style={styles.tch}>
        <Text style={styles.logintxt}>SIGN UP!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tch: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 2,
    margin: 35,
    width: '60%',
    backgroundColor: 'black',
    padding: 5,
    borderColor: '#bf4137',
  },
  logintxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acnttxt: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    marginBottom: '20%',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
