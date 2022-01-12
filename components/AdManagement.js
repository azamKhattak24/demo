import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity,
  SafeAreaView, FlatList } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';



const FIREBASE_API_ENDPOINT = 'https://moblail-default-rtdb.firebaseio.com/';

const deleteData = (id) => {
     
  const i = id;
  var requestOptions = {
    method: 'DELETE',
  };

  fetch(`${FIREBASE_API_ENDPOINT}/ads/${i}.json`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log('Delete Response:', result))
    .catch((error) => console.log('error', error));
};

const adM = ({navigation}) => {
  const [products,setProducts]=React.useState([])

  const getData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/ads.json`);
    const data = await response.json();
  
    var arr = [];
   var keyValues = Object.keys(data);
  
    for (let i = 0; i < keyValues.length; i++) {
      let key = keyValues[i];
      let credential = {
        Brand: data[key].Brand,
        Price: data[key].Price,
        Model: data[key].Model,
        Details: data[key].Details,
        Contact: data[key].Contact,
        ID: key
      
      };
      arr.push(credential);
    }
    console.log(arr);
    setProducts(arr)
  };
    
  React.useEffect(() => {
    getData();
  }, []);

  return (

        <View style={styles.container}>
      <Card>
      <Card.Title>AD MANAGEMENT</Card.Title>
            <Card.Divider />
      <FlatList
      refreshing={false}
      keyExtractor={(item) => item.key}
      onRefresh={getData}
      data={products}

      renderItem={({item,index})=>

      <View 
      style={{flexDirection:'row', justifyContent:'space-between'}}>
      <TouchableOpacity style={{flexDirection: 'row',marginBottom:5}}
     onPress={()=>
      navigation.navigate("AdManageDetails", item)
      }>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../assets/pixel4.jpg')}
        />
        <Text style={styles.name}>{item.Brand}</Text>
        </TouchableOpacity>
         <TouchableOpacity  onPress = {() => {navigation.navigate('AdManage'), deleteData(item.ID)}}>
        <Icon name='delete' />
        </TouchableOpacity>
      </View>
        }
        />
        </Card>
        </View>
     
  );
};

const adM2 =({navigation, route})=>{

  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
          
          <Card>
          
            <Card.Title>AD INFORMATION</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0, resizeMode: 'contain', overflow: 'hidden' }}
              source={{
                uri:
                  'https://hairmanz.com/wp-content/uploads/2020/04/man-bun-the-best-guide-for-men-mainart.jpg',
              }}
            />
          
            
        <Text style={{ fontSize: 25, fontWeight: 'bold',marginTop:5, marginBottom:5 }}>
         {route.params.Brand}

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

             <TouchableOpacity 
             onPress = {() => {navigation.navigate('AdManage'), deleteData(route.params.ID)}}
             style={styles.tch2}>
           <Icon name='delete'
           color='white'/>
             <Text style={styles.btntxt}>Delete</Text>
             </TouchableOpacity>



          </Card>
        </SafeAreaView>
        </ScrollView>
     
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
  txt1: {
    //padding: 5,
    fontSize:16,
    marginTop:'3%',
    
  },
  rowview: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  heading2: {
    fontSize: 15,
     fontWeight: 'bold',  
     textDecorationLine: 'underline' 
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

export  {adM,adM2};