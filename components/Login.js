import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { initializeApp } from 'firebase/app';

const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

const LoginScreen = ({ navigation, event }) => {
  const [users, setusers] = React.useState([]);
  const [getname, setname] = useState("");
  const [getpass, setpass] = useState("");

  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/Users.json`);
    const data = await response.json();
    
    var keyValues = Object.keys(data);
let arr=[]
    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      console.log('presentuserkey' + key);
      let credential = {
        admin: data[key].Admin,
        username: data[key].UserName,
        password: data[key].Password,
        email: data[key].Email,
        contact: data[key].Contact,
        id: key,
      };
      arr.push(credential);
    }
    setusers(arr)
   
  };

  React.useEffect(() => {
    getData();
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)

    } catch (e) {
      // saving error
    }
  }
  const passchk = () => {
    var flag = 0;
    for (let i in users) {
      console.log(users[i])
      if (users[i].admin==='1') {
        if (users[i].username === getname && users[i].password === getpass ) {
          flag = 2;
          break;
        }else{
          
        }
      }
       else {
        if (users[i].username === getname && users[i].password === getpass) {
          storeData(users[i]);
        
          //console.log(currentuser)
          flag = 1;
          break;
         
        }else{
          console.log("again pass not matched")
        
        }
      }
    }
    if (flag == 1) {
      navigation.navigate('User');
    }
    else if (flag == 2) {
      navigation.navigate('Admin');
    } 
    else {
      
      alert('Wrong Credential! \nEnter Again');
    }
  };

  
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require('../assets/Logo.jpeg')} />

        <Input
          style={styles.Input}
          placeholder="  Enter Your User Name"
          onChangeText={setname}
          value={getname}
          leftIcon={<Icon name="user" size={24} color="black" />}
        />
        <Input
          style={styles.Input}
          placeholder="  Enter Your Password"
          value={getpass}
          onChangeText={setpass}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.tch}
          onPress={() => passchk()}
          //onPress={() => navigation.navigate('Home')}
          disabled = {getpass==""}

        >
          <Text style={styles.logintxt}>LOGIN</Text>
        </TouchableOpacity>
        <Text> Not have an account? </Text>
        <TouchableOpacity
          style={styles.tch}
          //onPress = {() => passchk(getuser, getpass, users)}
          onPress={() => navigation.navigate('Sign')}>
          <Text style={styles.logintxt}>Create New Account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: "30%",
    margin: 10,
  },

  tch: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 2,
    margin: 35,
    width: '75%',
    backgroundColor: 'black',
    padding: 5,
    borderColor: '#bf4137',
  },
  logintxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  Input: {
    padding: 0,
    borderRadius: 100,
  },
  logo: {
    borderColor: '#bf4137',
    borderWidth: 1,
    borderRadius: 50,
    resizeMode: 'cover',
    overflow: 'hidden',
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginBottom: 35,
    marginTop: 15,
  },
});

export default LoginScreen;
