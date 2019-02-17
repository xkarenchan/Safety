
import React from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class ButtonBasics extends React.Component {
  render() {
    return (
      <View style = {{ flex: 1, backgroundColor: '#EDC7B7', padding: 35 }}>
        <View style={{ height: 150, backgroundColor: '#EEE2DC', borderRadius: 10 }}>
          <Text style={{color: '#123C69', fontSize: 40, padding:10, alignSelf: 'center'}}>Is this what you're trying to say?</Text>
        </View>
        <View style={{ height: 400, padding: 10, backgroundColor: '#BAB2B5', borderRadius: 10, marginVertical: 35 }}>
            
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#123C69', fontSize: 30 }}>Text</Text>
          </View>
          <View style={{ height: 3, backgroundColor: '#123C69' }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#123C69', fontSize: 30 }}>Translate</Text>
          </View>
        </View>
        <TouchableOpacity style = {{height: 40, width:100, backgroundColor: '#ac3b61', borderRadius: 10, alignSelf: 'center'}}>
          <Text style = {{color: '#EEE2DC', fontSize: 27, padding:2, alignSelf: 'center'}}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onPressButton() {
    Alert.alert('Submited!')
  }
}
