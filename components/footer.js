import  React ,{Component} from 'react';
import { Text, View, StyleSheet,Button, TouchableOpacity} from 'react-native';



const Footer =({navigation})=> {
  return (
    <View style={styles.footer}>
    
    <TouchableOpacity 
    onPress={()=> navigation.navigate('Home')} 
    >
    <Text>Home</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

 
  footer : {
  flex: 1,
  alignItems: 'center', 
  alignSelf: "center",  
  width: "100%",
  backgroundColor: "blue",
  padding:5
  },
 

})

export default Footer;