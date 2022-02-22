import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Button, FlatList, Image, Props, Alert } from 'react-native';
import 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
//import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
//import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const db = SQLite.openDatabase('locationdb.db');

export default function App() {
  const [postalCode, setPostalcode] = useState('');
  const [street, setStreet] = useState ('');
  const [title, setTitle] = useState('');
  const [surgery, setSurgery] = useState([]);
  //const [location, setLocation] = useState(null);
  //const [errorMsg, setErrorMsg] = useState(null);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  
  //await Promise.all(data)
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS locationdb', []);
      tx.executeSql('create table if not exists surgery (id integer primary key not null, postalCode text,  title text);');
    });
    updateList();    
  }, []);

  // Save surgery
  const saveItem = () => {
    db.transaction(tx => {
      console.log("PostalCode ="  + displayCurrentAddress,"name =" + title)
        tx.executeSql('insert into surgery (postalCode, title) values (?, ?);',[displayCurrentAddress,title]);    
      }, null, updateList
      )
      console.log("works")
  
 axios.post(
  'http://192.168.1.59:8000/api/placement',{ surgery:displayCurrentAddress, name:title}
  //'http://192.168.1.59:19000/api/placement',{ surgery:displayCurrentAddress, name:title}
  //'http://127.0.0.1:19000/api/placement',{ surgery:displayCurrentAddress, name:title}
  //'http://127.0.0.1:8000/api/placement',{ surgery:displayCurrentAddress, name:title}

)
.then(data => console.log(data))
  .catch(data => console.log(data))
  }
 

  // Update surgerylist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from surgery;', [], (_, { rows }) => {
        //console.log(rows._array)
        setSurgery(rows._array)}
      ); 
    });
  }

  // Delete surgery
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from surgery where id = ?;`, [id]);
      }, null, updateList
    )    
  }

// view surgery data
const viewList = (id) => {
    db.transaction(tx => {
      tx.executeSql('select * from surgery;', [id], (_, { rows }) => {
      //console.log(rows._array)
      return setSurgery(rows._array)
    }
       
      ); 
      
    });
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "5%"
        }}
      />
    );
  };




//postCode location finder
const [locationServiceEnabled, setLocationServiceEnabled] = useState(true);

 

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status, requestPermission } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
        
        
      });

      for (let item of response) {
        console.log(item)
        let address = `${item.postalCode}`; 
        setDisplayCurrentAddress(address);

        if (address.length > 0) {
          setTimeout(() => {
 

            //navigation.navigate('Home', { item: address });
          }, 2000);
        }
      }
    }
  };



  return (
    <View style={styles.container}>
    <Text style={{marginTop: 20, fontSize: 20, color: '#fff', marginBottom: 20,}}>Current location</Text>
      <Image source={require('../assets/images/geoyellow.png')} style={styles.image} />
      {/* <Text style={styles.text}>{displayCurrentAddress}</Text> */}


      <TextInput placeholder='Student ID' placeholderTextColor="#FAD607" style={{marginTop: 30, fontSize: 18, color: '#fff', width: 200, borderColor: '#FAD607', borderWidth: 1}}
        onChangeText={(title) => setTitle(title)}
        value={title}/>  
     <TextInput placeholder='Postcode' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, color: '#fff', width: 200, borderColor: '#FAD607', borderWidth: 1}}
        onValueChange={(postalCode) => setPostalcode (postalCode)}
        value={displayCurrentAddress}
        editable={false} /> 
      {/*  <TextInput placeholder='building name' style={{marginTop: 2, fontSize: 18, color: '#FAD607', width: 200}}
        onValueChange={(street) => setStreet (street)}
        value={displayCurrentAddress}
        editable={false} /> */}
        <Button onPress={saveItem} title="Save"  /> 
      

 
      
      <FlatList 
        style={{marginLeft : "1%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.postalCode}, {item.title}</Text>
        <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => viewItem(item.title)}></Text>
        <View style={styles.Button}>
         <Button title="Delete" onPress={() => deleteItem(item.id)} />
         </View>
        </View>} 
        data={surgery} 
        //ItemSeparatorComponent={listSeparator} 
      
      />      
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#005E7E',
  alignItems: 'center',
  justifyContent: 'center',
 },
 listcontainer: {
  flexDirection: 'row',
  //backgroundColor: '#fff',
  backgroundColor: '#FAD607',
  borderColor: 'gray',
  borderWidth: 1,
  alignItems: 'center'
 },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20
},
text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff'
  },

  Button:{
    fontSize: 20,
    fontWeight: '400',
    color: '#fff'
  }

});