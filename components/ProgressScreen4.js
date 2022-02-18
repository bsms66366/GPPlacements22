import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Button, ScrollView} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import * as Progress from 'react-native-progress';

const LeftContent = props => <Avatar.Icon color= "#FAD607" {...props}  icon="barcode" />

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activityIndicator: false, progress: 0, indeterminate: false};
  }

   startActivityIndicator() {
    this.setState({activityIndicator: true});
    setTimeout(() => {
      this.setState({activityIndicator: false});
    }, 5000);
  }

  activityIndicator() {
    //We can show either, activity indicator or the Button
    return this.state.activityIndicator ? (
      <ActivityIndicator size="large" color="#FAD607" />
    ) : (
      <Button
        title="Show Activity Indicator"
        onPress={() => this.startActivityIndicator()}
      />
    );
  } 

  startProgressIndicators() {
    let progress = 0;
    this.setState({progress, indeterminate: true}, () =>
      setTimeout(() => {
        this.setState({indeterminate: false});
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
          }
          this.setState({progress});
        }, 500);
      }, 1500),
    );
  }

  render() {
    return (
      
      <View style={styles.container}>

       
       

       
       
     {/*    <Text style={styles.text}>Pie</Text>
        <Progress.Pie
          progress={this.state.progress}
          size={80}
          style={{margin: 5}}
        /> */}

        {/* card1 */}
        <Card style={styles.cardbox}>
    <Card.Title title="Attendance " subtitle="here is your current attendance " left={LeftContent} />
    <Card.Content>
       <Title>Current Attendance</Title>
        <Progress.Circle
          size={30}
          indeterminate={this.state.indeterminate}
          progress={this.state.progress}
          showsText={true}
          size={80}
          style={{margin: 5}}
        />
<Card.Actions>
    <Button
          title="Start Progress Indicators"
          onPress={() => this.startProgressIndicators()}
        />
    </Card.Actions>
    </Card.Content>
    
</Card>
    <Card style={styles.cardbox}>
    <Card.Title title="Attendance " subtitle="here is your current attendance " left={LeftContent} />
    <Card.Content>
       <Title>Attendance progress bar</Title>
        <Text style={styles.text}>Bar</Text>
        <Progress.Bar
          progress={this.state.progress}
          width={200}
          style={{margin: 5}}
        /> 
    </Card.Content>
  </Card>
  
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#051923',
    margin: 10,
    fontSize: 30,
  },
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
    height: 270
  },
  cardbox1:{
    marginTop: 10,
    padding: 15,
    height: 240
  }
});

export default App;

{
  /* <Progress.Bar progress={0.3} width={200} />
<Progress.Pie progress={0.4} size={50} />
<Progress.CircleSnail color={['red', 'green', 'blue']} /> */
}