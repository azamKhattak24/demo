import  React  from 'react';
import { Text, View, 
        StyleSheet,Button, 
        SafeAreaView, TouchableOpacity,
         ImageBackground} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';



const Home =({navigation})=> {
  return (
    <SafeAreaView style={styles.container} >

      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("MobileAds")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%', fontSize:20}}>Mobiles</Text>
    <Icon name='mobile' size={24}/>
   </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("MyAds")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%',fontSize:20}}>My Ads</Text>
    <Icon name='table' size={24}/>
   </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Ad")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%', fontSize:20}}>Favourite</Text>
    <Icon name='heart' size={24} color='red'/>
   </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("PostAd")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%',fontSize:20}}>Post An Ad</Text>
    <Icon name='clipboard' size={24}/>
   </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Profile")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%',fontSize:20}}>Profile</Text>
    <Icon name='user-circle' size={24}/>
   </View>
        </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

 container : {
  flex: 1,
  alignItems: 'center',
  justifyContent:'center',
  backgroundColor:'black',
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
    alignItems: 'center', 
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: '50%',
    height: '15%',
    backgroundColor:'pink',
    justifyContent:'center'
    
  },

  image: {
    overflow: 'hidden',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    resizeMode: "contain"
  },

  touchView:{
 // position: 'absolute', 
  justifyContent: 'center', 
  alignItems: 'center', 
  flexDirection:'row'}
 

})

export default Home;