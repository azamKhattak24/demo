import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity,
  SafeAreaView, FlatList } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import { initializeApp } from "firebase/app";


const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

const deleteData = (id) => {
     
  const i = id;
  var requestOptions = {
    method: 'DELETE',
  };

  fetch(`${FIREBASE_API_ENDPOINT}/Users/${i}.json`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log('Delete Response:', result))
    .catch((error) => console.log('error', error));
};

const userM = ({navigation}) => {
  const [users, setusers] = React.useState();

  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/Users.json`);
    const data = await response.json();
  
    var arr = [];
   var keyValues = Object.keys(data);
  
    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      let credential = {
        username: data[key].UserName,
        email: data[key].Email,
        phone: data[key].Contact,
        id: key
      
      };
      arr.push(credential);
    }
    console.log(arr);
    setusers(arr)
  };
    
  React.useEffect(() => {
    getData();
  }, []);

  return (
        <View style={styles.container}>
      <Card>
      <Card.Title>User Management</Card.Title>
            <Card.Divider />
      <FlatList
      refreshing={false}
      keyExtractor={(item) => item.key}
      onRefresh={getData}
      data={users}

      renderItem={({item,index})=>

      <View 
      style={{flexDirection:'row', justifyContent:'space-between'}}>
      <TouchableOpacity style={{flexDirection: 'row',marginBottom:5}}
     onPress={()=>
      navigation.navigate("UserManageDetails", item)
      }>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../assets/pixel4.jpg')}
        />
        <Text style={styles.name}>{item.username}</Text>
        </TouchableOpacity>
         <TouchableOpacity  onPress = {() => {navigation.navigate('UserManage'), deleteData(item.id)}}>
        <Icon name='delete' />
        </TouchableOpacity>
      </View>
        }
        />
          </Card>
        </View>
     
  );
};

const userM2 =({navigation, route})=>{

  return (
    <SafeAreaView style={styles.container}>
          
          <Card>
          
            <Card.Title>PERSONAL INFORMATION</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0, resizeMode: 'contain', overflow: 'hidden' }}
              source={{
                uri:
                  'https://hairmanz.com/wp-content/uploads/2020/04/man-bun-the-best-guide-for-men-mainart.jpg',
              }}
            />
            
            
            <Text style = {{
              fontSize:18, fontWeight:'bold', 
              alignSelf: "center",
              margin:10
            
            }}> 
            PROFILE PICTURE</Text>
             <Card.Divider />
             <Text style= {styles.heading}>Name</Text>
            <Text style = {styles.txt}>{route.params.username} </Text>
            <Text style= {styles.heading}>Email</Text>
            <Text style = {styles.txt}>{route.params.email} </Text>
            <Text style= {styles.heading}>Mobile Number</Text>
            <Text style = {styles.txt}>{route.params.phone}</Text>
            <Card.Divider />

             <TouchableOpacity 
             onPress = {() => {navigation.navigate('UserManage'), deleteData(route.params.id)}}
             style={styles.tch2}>
           <Icon name='delete'
           color='white'/>
             <Text style={styles.btntxt}>Delete</Text>
             </TouchableOpacity>



          </Card>
        </SafeAreaView>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },

  heading: {
    fontSize: 14,
    marginTop:10,
    textDecorationLine: 'underline',
    marginBottom: 4,
    paddingLeft:5

  },
  txt: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft:5


  },
   tch2 : {
    alignItems: 'center', 
    alignSelf: "center",  
  borderRadius : 100,
  borderWidth : 2,
  borderColor: '#bf4137',
  width: "40%",
  backgroundColor: "black",
   padding:5,
    flexDirection: 'row',
     height: 40,
      marginTop: '12%',
  },

  btntxt: {
    fontSize:17,
    fontWeight: "bold",
    color:"white",
    alignContent:'center',
    alignSelf: 'center',
    marginLeft: "13%"
  }, 
 
});

export  {userM,userM2};