import React,{useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput

} from 'react-native';

import { Text, Card, Button, Icon, AntDesign, Overlay } from 'react-native-elements';


const FIREBASE_API_ENDPOINT = 'https://madproject-22019-default-rtdb.firebaseio.com/';


const Details = ({route}) => {
  const [report, setReport] =useState();
  const [offer, setOffer] =useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const {myItem}=route.params;
  
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlay2 = () => {
    setVisible2(!visible2);
  };
    const postData = () => {
      const id =myItem.ID;
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
         Report: report    
  
        }),
        
      };
      fetch(`${FIREBASE_API_ENDPOINT}/AdsReported.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    };

    const postData2 = () => {
      const id =myItem.ID;
      console.log("in details", id, myItem.ID)
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
         Offer: offer,   
        AdID: myItem.ID
        }),
        
      };
      fetch(`${FIREBASE_API_ENDPOINT}/Offers.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    };

  return (
    <SafeAreaView style={styles.container}>
    
      <Card style={{height:'100%'}}> 
      <ScrollView>
     <Card.Image
          style={{
            marginBottom: 10,
            resizeMode: 'contain',
            overflow: 'hidden',
          }}
         
        />
        <Text style={{ fontSize: 25, fontWeight: 'bold',  alignself: 'center', }}>
         {route.params.Name}
        </Text>
        <Card.Divider />
        <View style= {styles.rowview}>
        <Text style={styles.txt1}>Price: </Text>
        <Text style= {styles.txt1}>{myItem.Price}</Text>
        </View>
        <View style= {styles.rowview}>
        <Text style={styles.txt1}>Company:</Text>
        <Text style= {styles.txt1}>{myItem.Brand}</Text>
        </View>
        <View style= {[styles.rowview, {marginBottom:'5%'}]}>
        <Text style={styles.txt1}>Model:</Text>
        <Text style= {styles.txt1}>{myItem.Model}</Text>
        </View> 
         <Card.Divider />
        <Text style={styles.heading2}>Description</Text>
        <Text style={[styles.txt1, {marginBottom:'5%'}]}>{myItem.Details}</Text>
        <Card.Divider />
        <Text style={styles.heading2}>Conidtion</Text>
        <Text style={[styles.txt1, {marginBottom:'5%'}]}>New</Text>
        <Card.Divider /> 
        <Text style={styles.heading2}>Mobile Number</Text>
        <Text style={[styles.txt1, {marginBottom:'5%'}]}>{myItem.Contact}</Text> 
        <Card.Divider /> 
        <View style={styles.rowview}>
        <TouchableOpacity style={styles.reportbtn}
        onPress ={()=>{toggleOverlay()}}>
        <Text style={styles.imgtxt}>Report Ad</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.offertbtn}
        onPress ={()=>{toggleOverlay2()}}>
        <Text style={styles.imgtxt}>Offer</Text>
        </TouchableOpacity>
        </View>

        <Overlay isVisible={visible2} onBackdropPress={toggleOverlay2}>
        <Text style={styles.textPrimary}>Offers!</Text>
        <TextInput style={styles.textin}
        keyboardType='number-pad'
         onChangeText = {(x)=>setOffer(x)}
         ></TextInput>
        <Button
          title="Place Your Offer"
          onPress={()=>{postData2(); toggleOverlay2()}}
        />
      </Overlay>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Report Ad!</Text>
        <TextInput style={styles.textin}
         onChangeText = {(x)=>setReport(x)}></TextInput>
        <Button
          title="Okay"
          onPress={()=>{postData(); toggleOverlay()}}
        />
      </Overlay>
        
       </ScrollView>
      </Card>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt1: {
    //padding: 5,
    fontSize:16,
    marginTop:'3%',
    
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textin: {
  borderColor: '#bf4137', 
 borderWidth: 1,  
 marginBottom: 15,
 borderRadius: 14,
 fontSize: 18,
 fontWeight: '500'

  },
  heading2: {
    fontSize: 15,
     fontWeight: 'bold',  
     textDecorationLine: 'underline' 
  },
   
  rowview: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  reportbtn : {
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

  offertbtn : {
    alignItems: 'center', 
    alignSelf: "center",  
  borderRadius : 100,
  width: 100,
  backgroundColor: "green",
   padding:5,
  marginTop: '5%',

  },

});

export default Details;