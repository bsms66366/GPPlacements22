// Example of GridView using FlatList in React Native
// https://aboutreact.com/example-of-gridview-using-flatlist-in-react-native/

// import React in our code
import React, { useEffect, useState, setState  } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, FlatList, Image } from 'react-native';
import axios from 'axios';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const [dataSource, setDataSource] = useState([]);
  

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

  useState(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: 'http://192.168.1.59:8000/api/placement' + (i + 1) };
    });
    setData(items);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});
