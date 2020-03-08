import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';


export default class App extends Component {
    state = {
        location: "Fake Location"
    };

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
    
  render() {
    return (
      <View style={{padding: 50}}>
        <View style={{flexDirection: 'row'}}>
          <Button title = "Healthy"/>
          <Button
            onPress={this.findCoordinates}
            title = "Sick"
          />
        </View>
        <View>
            <Text style={styles.welcome}>User location: {this.state.location}</Text>
        </View>
      </View>
    );
  }
}

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
