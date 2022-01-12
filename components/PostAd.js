import  React, {useState}  from 'react';
import {
  View,
  TextInput,
  StyleSheet, TouchableOpacity,  SafeAreaView, Image, StatusBar, ScrollView,CheckBox, Picker
} from 'react-native'
import { Text, Card, Button, Icon, Overlay } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';


const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

var id;
const PostAd = ({navigation}) => {
  const [image, setimage] = useState();
  const [price, setPrice] =useState();
  const [brand, setBrand] =useState();
  const [model, setModel] =useState();
  const [detail, setDetail] =useState();
  const [isSelected, setSelect] = useState('');
  const [number, setNumber] =useState();
  const [visible, setVisible] = useState(false);
  //const [id, setid] = useState();
  
    const toggleOverlay = () => {
      setVisible(!visible);
    };

    const getid = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user')
        const val=JSON.parse(jsonValue);
        id = (val.id);
        console.log("post ad id", id)
       
      } catch(e) {
        // error reading value
      }
    }
  
    React.useEffect(() => {
      getid();
      //console.log("post ad id", id)
    }, []);
  
  //FIREBASE POSTING
  const postData = () => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        Image: image,
        Price: price,
        Brand: brand,
        Model: model,
        Details: detail,
        Contact: number, 
        condtion: isSelected,
        ID: id      

      }),
      
    };
    fetch(`${FIREBASE_API_ENDPOINT}/ads.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  var defaultimg = "https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI="
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult.uri)
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
          placeholder=' 50,000'
          keyboardType = "number-pad"
          onChangeText={(x)=>setPrice(x)}
        />
        <Text style = {styles.txt}> Company: </Text>
      <TextInput
          style={styles.input}
          placeholder=' Samsung'
          onChangeText={(x)=>setBrand(x)}
        />
        <Text style = {styles.txt}> Model: </Text>
      <TextInput
          style={styles.input}
          placeholder=' Galaxy A3'
          onChangeText={(x)=>setModel(x)}
        />
        <Text style = {styles.txt}> Description: </Text>
      <TextInput
          style={styles.input}
          multiline={true}
          placeholder=' Very Good in Condition, 10/10 '
          onChangeText={(x)=>setDetail(x)}     
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
          placeholder=' 0312-1234567'
          keyboardType = "number-pad"
          onChangeText={(x)=>setNumber(x)}
        />
        <Card.Divider />
        <TouchableOpacity style={styles.postbtn}
        onPress={()=>{postData();toggleOverlay()}}>
        <Text style={styles.imgtxt}>POST</Text>
        </TouchableOpacity>
        
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Success!</Text>
        <Text style={styles.textSecondary}>
          Posted Successfully.
        </Text>
        <Button
          title="Okay"
          onPress ={()=>{navigation.navigate("Home");toggleOverlay()}}
        />
      </Overlay>

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
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    padding:20
  },
});

export default PostAd;