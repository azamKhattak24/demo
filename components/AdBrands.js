import  React, {useState}  from 'react';
import {
  View,
  TextInput,
  StyleSheet, TouchableOpacity,  SafeAreaView, Image, StatusBar, ScrollView,CheckBox, Picker
} from 'react-native'
import { Text, Card, Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';


const adBrand = ({navigation}) => {
  const [image, setimage] = useState();
   const [isSelected, setSelect] = useState();
  var defaultimg = "https://qph.fs.quoracdn.net/main-qimg-32a38eb3353bfb125206cc39a0b7794e-lq"
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
    
        <SafeAreaView style={styles.container}>
          <Card>
            <Card.Title>Add New Brand</Card.Title>
            <Card.Divider />
            <Card.Image
              style={styles.logo}
      source={{ uri: image==null ? defaultimg:image }}/>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.tch}>
      <Text style={styles.imgtxt}>Choose Image</Text>
      </TouchableOpacity>
      <Card.Divider />
      <Text style = {{
              fontSize:18, fontWeight:'bold', 
              alignSelf: "center",
              marginTop:10
              ,marginBottom:7}}> 

      Brand Details</Text>
      
      <Text style= {styles.heading}>Brand Name</Text>
      <TextInput
          style={styles.input}
          placeholder='  Apple'
        />
        <Text style= {styles.heading}>Brand Email</Text>
        <TextInput
          style={styles.input}
          placeholder='  example@apple.com'
        />            
        <Text style= {styles.heading}>Brand Mobile Number </Text>
        <TextInput
          style={styles.input}
          placeholder='  0312-XXXXXXX'
          keyboardType = "number-pad"
        />
        <Card.Divider style={{marginTop:30}} />
        <TouchableOpacity 
        onPress = {() => navigation.navigate("Profile")}
        style={styles.tch2}>
        <Text style={styles.btntxt}>SAVE</Text>
        </TouchableOpacity>
        </Card>
        </SafeAreaView>
      
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop:"10%"
  },

  input: {
 borderColor: '#bf4137', 
 borderWidth: 1,  
 marginBottom: 10,
 borderRadius: 14,
 fontSize: 18,
 fontWeight: '500',
 marginTop:2
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
   marginTop: '10%',
   marginBottom: '4%',
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

export default adBrand;