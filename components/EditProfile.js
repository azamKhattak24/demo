import  React, {useState}  from 'react';
import {
  View,
  TextInput,
  StyleSheet, TouchableOpacity,  SafeAreaView, Image, StatusBar, ScrollView,CheckBox, Picker
} from 'react-native'
import { Text, Card, Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';



const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';




var id;
const EditProfileScreen = ({navigation, route}) => {
  
  const [username, setusername] = useState(route.params.name);
  const [email, setemail] = useState(route.params.Email);
  const [phone, setphone] = useState(route.params.contact);
  const [image, setimage] = useState();
   const [isSelected, setSelect] = useState('');

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



   const updateData = () => {
    var requestOptions = {
      method: 'PATCH',
      body: JSON.stringify({
        UserName: username,
        Email: email,
        Contact: phone,
      }),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/Users/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }; 
 

  var defaultimg = "https://hairmanz.com/wp-content/uploads/2020/04/man-bun-the-best-guide-for-men-mainart.jpg"
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
          <Card>
            <Card.Title>PERSONAL INFORMATION</Card.Title>
            <Card.Divider />
            <Card.Image
              style={styles.logo}
      source={{ uri: image==null ? defaultimg:image }}/>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.tch}>
      <Text style={styles.imgtxt}>Choose Image</Text>
      </TouchableOpacity>
            
      <Text style = {{
              fontSize:18, fontWeight:'bold', 
              alignSelf: "center",
              margin:10}}> 

      PROFILE PICTURE</Text>
      <Card.Divider />
      <Text style= {styles.heading}>Name</Text>
      <TextInput
          style={styles.input}
          placeholder='  Subyyal Siddiqui'
          onChangeText={(x)=> setusername(x)}
          value={username}
        />
        <Text style= {styles.heading}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='  subyyal1234@gmail.com'
          value={email}
          onChangeText={(x)=>setemail(x)}
        />            
        <Text style= {styles.heading}>Mobile Number </Text>
        <TextInput
          style={styles.input}
          placeholder='  0312-1234567'
          keyboardType = "number-pad"
          value={phone}
          onChangeText={(x)=>setphone(x)}
        />
        <Card.Divider />
        <TouchableOpacity 
        onPress = {() => {navigation.navigate("Home"); updateData();}}
        //onPress={()=>updateData()}
        style={styles.tch2}>
        <Text style={styles.btntxt}>SAVE</Text>
        </TouchableOpacity>
        </Card>
        </SafeAreaView>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:"10%"
  },
  
  txt: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft:5


  },
  input: {
 borderColor: '#bf4137', 
 borderWidth: 1,  
 marginBottom: 10,
 borderRadius: 14,
 fontSize: 18,
 fontWeight: '500'
  },
  
   tch2 : {
    alignItems: 'center', 
    alignSelf: "center",  
  borderRadius : 100,
  borderWidth : 2,
  borderColor: '#bf4137',
  width: 100,
  backgroundColor: "black",
   padding:5,
      marginTop: '20%',

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
  
  tch : {
    alignItems: 'center', 
alignSelf: "center", 
  borderColor: '#bf4137',
  borderRadius : 15,
  borderWidth : 2,
   marginTop: 20,
  width: "50%",
  backgroundColor: "black",
  padding:5,

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

export default EditProfileScreen;