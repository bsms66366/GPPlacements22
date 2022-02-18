import React, { Component } from "react";
import { View,StyleSheet,Text} from 'react-native';
import { Provider ,Appbar,Card} from 'react-native-paper';
import { ProgressCircle } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const MyWebtutsComponent = () => {
      
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    return (
      <Provider>
          <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="MyWebtuts" subtitle="Subtitle" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
          </Appbar.Header>
          <View style={styles.mainbox}>
            <Text style={styles.title}>React Native Progress Circle Chart Example</Text>
            <Card style={styles.cardbox}>
               <ProgressCircle style={{ height: 250 }} progress={0.8} progressColor={'rgb(65, 140, 0)'} >
               </ProgressCircle>
             </Card>
          </View>
      </Provider>
    );
  };


const styles = StyleSheet.create({
    mainbox:{
      textAlign:'center',
      margin: 15,
      justifyContent: 'space-between',
    },
    title:{
      fontSize: 16
    },
    cardbox:{
      marginTop: 10,
      padding: 15,
    }
});
export default MyWebtutsComponent;