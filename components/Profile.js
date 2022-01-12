import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { initializeApp } from "firebase/app";

import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

var id;

const ProfileScreen = ({ navigation }) => {

  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const getid = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      const val=JSON.parse(jsonValue);
      id = val.id;
     
    } catch(e) {
      // error reading value
    }
  }

  React.useEffect(() => {
    getid();
  }, []);
 
  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/Users.json`);
    const data = await response.json();

   var keyValues = Object.keys(data);
      let key = keyValues[id];
      
        setusername(data[id].UserName),
        setemail(data[id].Email),
        setphone(data[id].Contact);
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
          style={{borderRadius: 100,
            borderWidth: 2,
            borderColor: '#bf4137',
            backgroundColor: 'black',
            padding: 5,
            alignItems: 'center',
            padding: 10,
           }} >
          <Text style={{ 
          fontWeight: 'bold',
          color: 'white',}}>
            LOGOUT</Text></TouchableOpacity>
      )
    });
  });

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Card>
          <Card.Title>PERSONAL INFORMATION</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0, resizeMode: 'contain', overflow: 'hidden' }}
            source={{
              uri: 'https://hairmanz.com/wp-content/uploads/2020/04/man-bun-the-best-guide-for-men-mainart.jpg',
            }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
              margin: 10,
            }}>
            PROFILE PICTURE
          </Text>
          <Card.Divider />
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.txt}>{username} </Text>
          <Text style={styles.heading}>Email</Text>
          <Text style={styles.txt}>{email}</Text>
          <Text style={styles.heading}>Mobile Number</Text>
          <Text style={styles.txt}>{phone}</Text>
          <Card.Divider />

          <TouchableOpacity
            onPress={() => {navigation.navigate('EditProfile', {name:username, Email:email,
            contact:phone, Id: id})}}
            style={styles.tch2}>
            <Image
              source={{
                uri: 'https://www.iconsdb.com/icons/preview/white/edit-xxl.png',
              }}
              style={styles.buttonImageIconStyle}
            />
            <Text style={styles.btntxt}>Edit Your Profile</Text>
          </TouchableOpacity>
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:"10%"
  },
  heading: {
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
    marginBottom: 4,
    paddingLeft: 5,
  },
  txt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
  },
  tch2: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#bf4137',
    width: '50%',
    backgroundColor: 'black',
    padding: 5,
    flexDirection: 'row',
    height: 40,
    marginTop: '20%',
  },

  btntxt: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: '10%',
  },

  buttonImageIconStyle: {
    margin: 5,
    height: 25,
    width: 20,
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
