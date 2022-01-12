import  React ,{Component} from 'react';
import { Text, View, 
        StyleSheet,Button, 
        SafeAreaView, TouchableOpacity,
         ImageBackground} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const adminHome =({navigation})=> {
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
          style={{borderRadius: 100,
            borderWidth: 2,
            borderColor: '#bf4137',
            backgroundColor: 'black',
            padding: 5,
            alignItems: 'center',
            padding: 10,
           }} >
          <Text style={{ 
          fontWeight: 'bold',
          color: 'white',}}>
            LOGOUT</Text></TouchableOpacity>
      )
    });
  });
  return (
    <SafeAreaView style={styles.container} >
   <Text style={{
     fontSize:40,
     alignSelf:'center',
     marginBottom:'10%'
   }}>ADMIN SIDE</Text>
   
    <View style={styles.body}>
    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("AddBrand")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>Add Brands</Text>
    <Icon name='copyright' size={24}/>
   </View>
        </TouchableOpacity>


    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("UserManage")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>User Management</Text>
    <Icon name='tasks' size={24}/>
   </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("AdManage")}}>
         <View style={styles.touchView}>
     <Text style ={{fontWeight:'bold', marginRight:'5%'}}>Ad Management</Text>
    <Icon name='tasks' size={24} />
   </View>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

 container : {
  flex: 1,
  padding:'10%',
  marginTop:'30%'
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
    width: '70%',
    height: '20%',
    backgroundColor:'pink'
  },

  touchView:{
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection:'row'}

})
export default adminHome;