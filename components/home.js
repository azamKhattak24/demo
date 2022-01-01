import  React ,{Component} from 'react';
import { Text, View, 
        StyleSheet,Button, 
        SafeAreaView, TouchableOpacity,
         ImageBackground} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';



const Home =({navigation})=> {
  return (
    <SafeAreaView style={styles.container} >
   
    <View style={styles.body}>
     <ImageBackground style={styles.image, styles.body} source={require('../assets/back.jpg')}>
     
    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("MobileAds")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>Mobiles</Text>
    <Icon name='mobile' size={24}/>
   </View>
        </TouchableOpacity>


    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("MyAds")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>My Ads</Text>
    <Icon name='table' size={24}/>
   </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Ad")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>Favourite</Text>
    <Icon name='heart' size={24} color='red'/>
   </View>
        </TouchableOpacity>
        
       <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("PostAD")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>Post An Ad</Text>
    <Icon name='clipboard' size={24}/>
   </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button, styles.touchView} onPress={()=>{navigation.navigate("Ad")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>Profile</Text>
    <Icon name='user-circle' size={24} />
   </View>
        </TouchableOpacity>
    </ImageBackground>
        
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

 container : {
  flex: 1
  },
 
  body : {
  flex: 1,
  alignItems: 'center', 
  alignSelf: "center",  
  width: "100%",
  padding:5
  },

  button: {
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: '50%',
    height: '15%',
    backgroundColor:'pink'
    
    
  },

  image: {
    overflow: 'hidden',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    resizeMode: "contain"
  },

  touchView:{
  position: 'absolute', 
  justifyContent: 'center', 
  alignItems: 'center', 
  flexDirection:'row'}
 

})

export default Home;