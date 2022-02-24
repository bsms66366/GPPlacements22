//import React from "react";
import React, { useEffect, useState, setState } from 'react';
import { View, ActivityIndicator, RefreshControl, StyleSheet, Text, SafeAreaView, Button, FlatList, TouchableOpacity } from 'react-native';
//import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import {
  Dimensions,
  Image,
  //Slider,
  //SafeAreaView,
  
  Alert,
  TextInput
 
  //VirtualizedList
} from "react-native";
import { Asset } from "expo-asset";
import Constants from 'expo-constants';
import { Audio, Video } from "expo-av";
import * as Font from "expo-font";
//import List from "../components/List2";
import { MaterialIcons } from "@expo/vector-icons";
//import SearchBar from 'react-native-searchbar';
import axios from 'axios';


export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.59:8000/api/placement')
      .then(({ data }) => {
        console.log(data);
        //console.log("defaultApp -> data", data.name)
        setData(data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  const GridView = ({ name }) => (
    <View style={styleSheet.gridStyle}>
      <Text style={styleSheet.gridText}>{name}</Text>
    </View>
  );
  
    <View style={{ flex: 1, padding: 24, backgroundColor: '#005E7E', }}>
    <Text style={{ color: '#FFF', fontSize: 20, marginTop: 10, marginBottom:15, textAlign:"center"}}>ATTENDANCE HISTORY</Text>
      {isLoading ? <ActivityIndicator /> : (
        
        <FlatList 
          data={data}
          //data={data, numColumns}
        //style={styles.container}

          renderItem={({ item }) => <GridView name={item.name} />} {
            keyExtractor={item => item.id}
        numColumns={2}
        key={item => item.id}
        />
            console.log("item", item)
            return ( 
            
                // <TouchableOpacity onPress = {() => WebBrowser.openBrowserAsync(item.title)}>
               
              <Text style={{ flex: 1,  backgroundColor: '#FAD607',

                //borderRadius: 20,
                padding: 8,
                marginVertical: 5,
                marginHorizontal: 8,
                marginBottom: 15
                }}>{item.name}
                </Text>
              
            //   </TouchableOpacity> 
           
            )
          }}
          
        />
      )}
    </View>
   
  );

 


//styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 20,
      //marginTop: Constants.statusBarHeight,
      backgroundColor: '#005E7E',
    },

  item: {
    backgroundColor: '#FAD607',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    //borderRadius: 20,
   // padding: 8,
    //marginVertical: 5,
    //marginHorizontal: 8,
    //marginBottom: 15,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  Logo: {
    height: 80,
    alignItems: 'center',
},
  name: {
    fontSize: 16,
    //fontWeight: "bold",
    color: "#000",

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'black',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#FAD607',
    //borderColor: '#FAD607',
    //paddingTop: 5,
    borderRadius: 20,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 8,
    marginBottom: 15,
    alignItems: 'center', 
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    fontSize: 18, 
   },
   itemText: {
    color: '#fff',
  },
});

}





