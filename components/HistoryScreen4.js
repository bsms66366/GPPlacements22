/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component, useEffect, useState, setState } from 'react';
 import {
   StyleSheet,
   Text,
   FlatList,
   View
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios';
 //export default class Example extends Component {
/*    constructor(){
     super()
     this.data = [
       {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
       {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
       {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
       {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
       {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
     ]
   } 
 
   render() { */
     //'rgb(45,156,219)'
     export default function App() {
        const [data, setData] = useState([]);
        const [isLoading, setLoading] = useState(true);
      
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

     return (
       <View style={styles.container}>
         <Timeline 
           style={styles.list}
           data={data}
           renderItem={({ item }) =>  {
            console.log("item", item) }
           }
            
         />
         <Text style={[styles.title]}>{item.name}</Text>
       </View>
     );
   }

 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
         paddingTop:65,
         backgroundColor:'white'
   },
   list: {
     flex: 1,
     marginTop:20,
   },
 });