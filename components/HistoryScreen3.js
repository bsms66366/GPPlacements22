import React, { useEffect, useState, setState } from 'react';

import { View, StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
//import DatePicker from '@react-native-community/datetimepicker';
//import RNDateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios';


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
  //const [date, setDate] = useState(true);
  //const created_at = useState(true).format('YYY/MM/DD HH:mm');
  const GridView = ({ name}) => (
    <View style={styleSheet.gridStyle}>
    <MaterialCommunityIcons name="qrcode" size={40} color="#FAD607" />
      <Text style={styleSheet.gridText}>{name}</Text>
     {/* <Text style={styles.timer}>{time.toDateString()}</Text>
      <DateTimePicker mode="date"/>
       <Text style={styleSheet.gridText}>{updated_at}</Text> */}
     
    </View>
  );

  return (
    <SafeAreaView style={styleSheet.MainContainer}>

      <FlatList
        data={data}
        //date={date}
        renderItem={({ item }) => <GridView name={item.icon, item.name, item.surgery} />}
        keyExtractor={item => item.id}
        numColumns={1}
        key={item => item.id}
      />

    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({

  MainContainer: {
    flex: 1,
    backgroundColor: '#FAD607'
  },

  gridStyle: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    margin: 1,
    backgroundColor: '#005E7E',
    //DatePicker: 'item.created_at.format('YYY/MM/DD HH:mm'),
  },

  gridText: {
    fontSize: 12,
    color: '#FAD607'
  }

});