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
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { initializeApp } from "firebase/app";


const FIREBASE_API_ENDPOINT = 'https://madproject-22019-default-rtdb.firebaseio.com/';

const MobileAds = ({navigation}) => {
const [products, setProducts] = React.useState();

const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/tasks.json`);
    const data = await response.json();

    var arr = [];
   var keyValues = Object.keys(data);

    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      let credential = {
        Brand: data[key].Brand,
        Price: data[key].Price,
        Model: data[key].Model,
        Details: data[key].Details,
        Contact: data[key].Contact
      };
      arr.push(credential);
    }
    console.log(arr);
    setProducts(arr)
  };
    
  React.useEffect(() => {
    getData();
  }, [setProducts]);
  
 return (
    <View style = {{flex:1, alignSelf: 'center'}}>
      <FlatList style={styles.showList}
      refreshing={false}
      onRefresh={getData}
      data={products}
      numColumns={2}
      renderItem={({item,index})=>
      <TouchableOpacity 
      onPress={()=>
        navigation.navigate("Details", item)
        }>
            <Card containerStyle={styles.box}>
              <Card.Image
                style={{ marginBottom:10, resizeMode:'contain', overflow:'hidden'}}
                 source={require('../assets/pixel4.jpg')}
                  resizeMode="cover"
              />
              <Card.Divider />
              <Text style={styles.cardTitle}>{item.Brand}</Text>
              <Text style={styles.priceText}>{item.Price}</Text>
              <Card.Divider />
              
            </Card>
      </TouchableOpacity>
        }
        />
       
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    
    
  },
   button: {
    borderRadius: 10,
    marginBottom: '5%',
    

    width: '100%',
    height: '15%',
    padding:10
  },
  box: {
    flex:1,
    backgroundColor:'lightgray',
    width:"90%"
    
  },
 search: {
      alignContent:'center',
      borderColor:'black',
      borderWidth:1,
      width: "70%",
      borderRadius:5,
      marginLeft:'10%',
      marginTop: '2%',
      marginBottom: '5%'
    
 }
  
 
});

export  default MobileAds;
