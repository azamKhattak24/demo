import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity,
  SafeAreaView, FlatList } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';



const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';
const OfferScreen = ({navigation,route}) => {
    const [Offer, setOffer] = React.useState();


    const deleteData = (i) => {
     
        const id = i;
        console.log("in offer delete", id)
        var requestOptions = {
          method: 'DELETE',
        };
    
        fetch(`${FIREBASE_API_ENDPOINT}/Offers/${id}.json`, requestOptions)
          .then((response) => response.json())
          .then((result) => console.log('Delete Response:', result))
          .catch((error) => console.log('error', error));
      };
      


  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/Offers.json`);
    const data = await response.json();
  
    var arr = [];
   var keyValues = Object.keys(data);
  
    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      let credential = {
        Offers: data[key].Offer,
        Adid: data[key].AdID,  
        userid: data[key].id,
        image: data[key].Image,
        name: data[key].Username,
        id: key, 
      
      };
      arr.push(credential);
    }
   console.log("in offer",arr)
    setOffer(arr.filter(element => {
        return element.Adid == route.params.i;
      }))
  };
    
  React.useEffect(() => {
    getData();
  }, []);

  return (
        <View style={styles.container}>
      <Card>
      <Card.Title>Offers On Your Ad</Card.Title>
            <Card.Divider />
      <FlatList
      refreshing={false}
      keyExtractor={(item) => item.key}
      onRefresh={getData}
      data={Offer}

      renderItem={({item,index})=>

      <View 
      style={{flexDirection:'row', justifyContent:'space-between'}}>
      <TouchableOpacity style={{flexDirection: 'row',marginBottom:5}}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: item.image}}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.name, {marginLeft:'35%'}]}>Rs {item.Offers}</Text>
        </TouchableOpacity>
         <TouchableOpacity  onPress = {() => {deleteData(item.id)}}>
        <Icon name='delete' />
        </TouchableOpacity>
      </View>
        }
        />
          </Card>
        </View>
     
  );
};



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
    fontWeight:'bold'
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

export  default OfferScreen;