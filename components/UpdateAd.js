import  React, {useState}  from 'react';
import {
  View,
  TextInput,
  StyleSheet, TouchableOpacity,  SafeAreaView, Image, StatusBar, ScrollView,CheckBox, Picker
} from 'react-native'
import { Text, Card, Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import { initializeApp } from "firebase/app";


const FIREBASE_API_ENDPOINT = 'https://madproject-22019-default-rtdb.firebaseio.com/';



const UpdateAd = ({navigation,route}) => {
  console.log("Plis"+route.params.p)
  const [image, setimage] = useState();
  const [price, setPrice] =useState(route.params.p);
  const [brand, setBrand] =useState(route.params.b);
  const [model, setModel] =useState(route.params.m);
  const [detail, setDetail] =useState(route.params.d);
  const [isSelected, setSelect] = useState('');
  const [number, setNumber] =useState(route.params.c);
  const [img, setimg] = useState();
  

const [getD,setD] = useState();
  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/tasks.json`);
    const data = await response.json();
    console.log(data);
  };
  console.log(price,brand,model+"i is")
  const updateData = () => {

    const id = "-MsHNtJnNYtq6JeQ91Gz";
    console.log('I am update')
   // console.log(id)
    var requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        Price: price,
        Brand: brand,
        Model: model,
        Details: detail,
        Contact: number, 
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/tasks/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };


  var defaultimg = "https://www.gizmochina.com/wp-content/uploads/2018/02/Samsung-Galaxy-S8-Plus-G955F_2-500x500.jpg"
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setimage(pickerResult.uri)
    console.log(pickerResult);
   
  }
  return (
    <>
        <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card>
          
            <Card.Title>UPLOAD NEW AD</Card.Title>
            <Card.Divider />
            <Card.Image
              style={styles.logo}
      source={{ uri: image==null ? defaultimg:image }}/>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.imgbtn}>
      <Text style={styles.imgtxt}>Choose Image</Text>
      </TouchableOpacity>  
      <Card.Divider />
      
      <Text style = {{
        textAlign: "center",
         fontWeight: 'bold', 
         fontSize:30,}}>
       Ad Details </Text>
      <Text style = {styles.txt}> Price: </Text>
      <TextInput
          style={styles.input}
          keyboardType = "number-pad"
          value={price}
          onChangeText = {(x)=>setPrice(x)}
        />

        <Text style = {styles.txt}> Company: </Text>
      <TextInput
          style={styles.input}
          value={brand}
          onChangeText = {(x)=>setBrand(x)}
        />

        <Text style = {styles.txt}> Model: </Text>
      <TextInput
          style={styles.input}
          value={model}
          onChangeText = {(x)=>setModel(x)}
        /><Text style = {styles.txt}> Description: </Text>
      
      <TextInput
          style={styles.input}
          multiline={true}
          value={detail}
          onChangeText = {(x)=>setDetail(x)}
        />
        <Text style = {styles.txt}> Condition: </Text>
        
        <Picker
        selectedValue={isSelected}
        style={{ height: 30, width: 100, marginBottom: 10 }}
        onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}>
        <Picker.Item label="Used" value="Used" />
        <Picker.Item label="New" value="New" />
      </Picker>

        <Text style = {styles.txt}> Contact Number: </Text>
      <TextInput
          style={styles.input}
          keyboardType = "number-pad"
          value={number}
          onChangeText = {(x)=>setNumber(x)}
        />
        <Card.Divider />
        <TouchableOpacity style={styles.postbtn}
        onPress ={()=>updateData()}>
        <Text style={styles.imgtxt}>UPDATE</Text>
        </TouchableOpacity>
        

        </Card>
        </ScrollView>
        
        </SafeAreaView>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  txt: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 7,
  },
  input: {
 borderColor: '#bf4137', 
 borderWidth: 1,  
 marginBottom: 15,
 borderRadius: 14,
 fontSize: 18,
 fontWeight: '500'
  },
  
   postbtn : {
    alignItems: 'center', 
    alignSelf: "center",  
  borderRadius : 100,
  borderWidth : 2,
  borderColor: '#bf4137',
  width: 100,
  backgroundColor: "black",
   padding:5,
  marginTop: '5%',

  },

  btntxt: {
    fontSize:20,
    fontWeight: "bold",
    color:"white",
    alignContent:'center',
    alignSelf: 'center',
  }, 
 
  logo: {

  padding: 0, 
  resizeMode: 'contain', 
  overflow: 'hidden'
  }, 
  
  imgbtn : {
    alignItems: 'center', 
alignSelf: "center", 
  borderColor: '#bf4137',
  borderRadius : 15,
  borderWidth : 2,
   marginTop: 20,
  width: "50%",
  backgroundColor: "black",
  padding:5,
  marginBottom: '7%'

  },
  imgtxt: {
    fontSize:20,
    fontWeight: "bold",
    color:"white"
    
  }, 
    heading: {
    fontSize: 14,
    marginTop:10,
    textDecorationLine: 'underline',
    marginBottom: 4,
    paddingLeft:5,
    fontWeight: 'bold'

  },
});

export default UpdateAd;