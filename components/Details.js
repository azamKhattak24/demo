import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,

} from 'react-native';

import { Text, Card, Button, Icon, AntDesign } from 'react-native-elements';

const Details = ({route}) => {
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
         source={{ uri: route.params.img }}
        />
        <Text style={{ fontSize: 25, fontWeight: 'bold',  alignself: 'center', }}>
         {route.params.Name}
        </Text>
        <Card.Divider />
        <View style= {styles.rowview}>
        <Text style={styles.txt1}>Price: </Text>
        <Text style= {styles.txt1}>{route.params.Price}</Text>
        </View>
        <View style= {styles.rowview}>
        <Text style={styles.txt1}>Company:</Text>
        <Text style= {styles.txt1}>{route.params.Brand}</Text>
        </View>
        <View style= {[styles.rowview, {marginBottom:'5%'}]}>
        <Text style={styles.txt1}>Model:</Text>
        <Text style= {styles.txt1}>{route.params.Model}</Text>
        </View> 
         <Card.Divider />
        <Text style={styles.heading2}>Description</Text>
        <Text style={[styles.txt1, {marginBottom:'5%'}]}>{route.params.Details}</Text>
        <Card.Divider />
        <Text style={styles.heading2}>Conidtion</Text>
        <Text style={[styles.txt1, {marginBottom:'5%'}]}>New</Text>
        <Card.Divider /> 
        <Text style={styles.heading2}>Mobile Number</Text>
        <Text style={[styles.txt1, {marginBottom:'5%'}]}>{route.params.Contact}</Text> 
        <Card.Divider /> 
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
  heading2: {
    fontSize: 15,
     fontWeight: 'bold',  
     textDecorationLine: 'underline' 
  },
   tch2 : {
    alignItems: 'center', 
    alignSelf: "center",  
  borderRadius : 100,
  borderWidth : 2,
  width: 107,
  backgroundColor: "black",
   padding:5,
    flexDirection: 'row',
     height: 40,
      margin: 2,
  },
  btntxt: {
    fontSize:13,
    fontWeight: "bold",
    color:"white"
  }, 
 
  buttonImageIconStyle: {
    margin: 5,
    height: 25,
    width: 20,
    resizeMode: 'contain',
  }, 
  viewbtn:{
        flexDirection: "row",
        //position:'relative',
        bottom:0,
        //width: "110%",
        //marginLeft:-12,
        marginTop:'20%',
        justifyContent: 'center'


  },
  rowview: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  } 
});

export default Details;