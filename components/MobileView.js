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

import { Text, Card, Button, Icon,SearchBar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

import { initializeApp } from "firebase/app";


const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

const MobileAds = ({navigation}) => {
const [search, setSearch] = React.useState("");
const [products,setProducts]=React.useState([])
const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/ads.json`);
    const data = await response.json();

    var arr = [];
   var keyValues = Object.keys(data);

    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      let credential = {
        Image: data[key].Image,
        Brand: data[key].Brand,
        Price: data[key].Price,
        Model: data[key].Model,
        Details: data[key].Details,
        Contact: data[key].Contact,
        ID: key
      };
      arr.push(credential);
      console.log("in mobile view", arr)
    }
    setProducts(arr)
  };
    
  React.useEffect(() => {
    getData();
  }, [setProducts]);

  const searching = () => {
    return products.filter((element) => {
      return element.Brand.toUpperCase().includes(search.toUpperCase());
    });
  };
 return (
    <View style = {styles.container}>
      <View style={styles.srch}>
      <SearchBar
        placeholder="Seacrh Mobile"
        onChangeText={setSearch}
        value={search}
      /></View>
      <FlatList style={styles.showList}
      refreshing={false}
      keyExtractor={(item) => item.key}
      onRefresh={getData}
      data={search.length>1?searching():products
       }
      numColumns={2}
      renderItem={({item,index})=>
      <TouchableOpacity 
      style={styles.touch}
      onPress={()=>
        navigation.navigate("Details", {myItem:item})
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
  
 srch: {
      alignContent:'center',
      borderColor:'#f5f5f5',
      borderWidth:2,
      width: "70%",
      borderRadius:5,
      marginLeft:'10%',
      marginTop: '2%',
      marginBottom: '7%'
    
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

export  default MobileAds;