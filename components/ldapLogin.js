import React, { Component } from 'react';
 
import { StyleSheet, TextInput, View, Alert, Button, Text} from 'react-native';

// Importing Stack Navigator library to add multiple activities.
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import { DefaultTheme, Card } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import LocationLog from "./components/LocationLog";
import ScanQRScreen6 from "./components/ScanQRScreen6";

import VideoCSScreen4 from "./components/VideoCSScreen4";

import HistoryScreen4 from "./components/HistoryScreen4";




class LoginActivity extends Component {

  // Setting up Login Activity title.
  static navigationOptions =
   {
      title: 'LoginActivity',
   };
 
constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserEmail: '',
      UserPassword: ''
 
    }
 
  }

  UserLoginFunction = () =>{
 
    const { UserEmail }  = this.state ;
    const { UserPassword }  = this.state ;
    
    
   fetch('https://reactnativecode.000webhostapp.com/User_Login.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       email: UserEmail,
    
       password: UserPassword
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
   
           // If server response message same as Data Matched
          if(responseJson === 'Data Matched')
           {
   
               //Then open Profile activity and send user email to profile activity.
               this.props.navigation.navigate('Second', { Email: UserEmail });
   
           }
           else{
   
             Alert.alert(responseJson);
           }
   
         }).catch((error) => {
           console.error(error);
         });
    
     }

     

}

    return (
 
<View style={styles.MainContainer}>
 
        <Text style= {styles.TextComponentStyle}>User Login Form</Text>
  
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"
 
          onChangeText={UserEmail => this.setState({UserEmail})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
        />
 
        <TextInput
          
          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"
 
          onChangeText={UserPassword => this.setState({UserPassword})}
 
          // Making the Under line Transparent.
          underlineColorAndroid='transparent'
 
          style={styles.TextInputStyleClass}
 
          secureTextEntry={true}
        />
 
        <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
      
  
 
</View>
            
    );
 
