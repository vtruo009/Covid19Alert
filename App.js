import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import * as firebase from 'firebase'


export default class App extends Component {
    constructor(props) {
      super(props);
      this.storeSickPerson = this.storeSickPerson.bind(this);
    }
    state = {
        location: "Fake Location",
        long : "123",
        lat : "123"
    }
    storeSickPerson(long, lat) {
      // let long_temp = this.long
      // let lat_temp = this.lat
      //console.log("add ran opening")
      firebase.database().ref('SickPerson/').set(
        JSON.parse('{"cordinates": { "long": ' +  long + ', "lat":' + lat +'}}'));
      //console.log("add ran closing")
    }
    clearSickPerson(){
      //console.log("clear ran opening")
      firebase.database().ref('SickPerson/').set(
        null)
      //console.log("clear ran closing")
    }
  initFB()
  {
    //console.log("-------\nconnecting to firebase")
    const firebaseConfig = {
      apiKey: "AIzaSyAzd3JJvqpVhut5wRm_ng58TrcvU4uqIM8",
      authDomain: "athenahacks-covid.firebaseapp.com",
      databaseURL: "https://athenahacks-covid.firebaseio.com",
      storageBucket: "athenahacks-covid.appspot.com"
    }
    firebase.initializeApp(firebaseConfig)
  }
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const location = JSON.stringify(position);
            this.setState({ location });
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
  };
  componentDidMount()
  {
    if (!firebase.apps.length) 
    {
      this.initFB
    }
    //console.log("--------\ndid not to firebase")
  }
  test(){
    //console.log("hello")
  }
  render() {
    this.findCoordinates()
    return (
      <View style={{padding: 50}}>
        <View style={{flexDirection: 'row'}}>
          <Button 
            onPress = {this.clearSickPerson}
            title = "Healthy"/>
          <Button
            onPress={() => this.storeSickPerson(1,2)}
            title = "Sick"/>
        </View>
        <View>
          <Text style={styles.welcome}>User location: {this.state.location}</Text>
        </View>
      </View>
    )
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});