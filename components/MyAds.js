import React from 'react';
import {
  View, TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Objects
} from 'react-native';

import { Text, Card, Button, Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

var id;

const MyAds = ({navigation}) => {
const [products, setProducts] = React.useState();

const getid = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user')
    const val=JSON.parse(jsonValue);
    id = (val.id);
    console.log("id", id)
   
  } catch(e) {
    // error reading value
  }
}

React.useEffect(() => {
  getid();
  //console.log("post ad id", id)
}, []);

const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/ads.json`);
    const data = await response.json();

    var arr = [];
   var keyValues = Object.keys(data);
   

    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      //console.log(key);
      let credential = {
        Image: data[key].Image,
        Brand: data[key].Brand,
        Price: data[key].Price,
        Model: data[key].Model,
        Details: data[key].Details,
        Contact: data[key].Contact,
        ID: key,
        Userid: data[key].ID
      };

      arr.push(credential);
      console.log("filter rzlr",arr)
    }
    setProducts(arr.filter(element => {
      return element.Userid == id;
    }))
  };
    
  React.useEffect(() => {
    getData();
  }, [setProducts]);

  
  
 return (
    <View style = {styles.container}>
      <FlatList style={styles.showList}
      refreshing={false}
      keyExtractor={(item) => item.key}
      onRefresh={getData}
      data={products}
      numColumns={2}
      renderItem={({item,index})=>
      <TouchableOpacity 
      style={styles.touch}
      onPress={()=>
        navigation.navigate("MyAdsDetails", item)
        }>
            <Card containerStyle={styles.box}>
              <Card.Image
                style={{ marginBottom:10, resizeMode:'contain', overflow:'hidden'}}
                 source={{uri:item.Image}}
                  resizeMode="contain"
              />
              <Card.Divider />
              <Text style={styles.cardTitle}>{item.Model}</Text>
              <Text style={styles.cardText}>{item.Price}</Text>
              <Card.Divider />
              
            </Card>
      </TouchableOpacity>
        }
        />
       
    </View>
  
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'black',
    },
   
  showList:{
    flex:1,
    width:"90%",
  },
  box: {
    padding:0,
    backgroundColor:'lightgray',
    width:"100%",
  },
  touch: {
    padding:10,
    width:"47%",
    height:"50%"
  },
  
 cardTitle: {
  padding:5,
  alignSelf:'center',
  fontWeight:'bold',
  marginTop:-10
 },
 cardText: {
  alignSelf:'center',
  marginBottom:5
 },

 
});

export  default MyAds;