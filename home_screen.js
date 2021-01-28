import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default class SlackIcon extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.newcontainer}>
          <Text style={{color: '#BCA18D',fontSize: 25}}> Please Press to Record </Text>
          <TouchableOpacity onPress={() => console.log('test')}>
            <Image
              source={require('../assets/images/icon-record2.png')}
              fadeDuration={0}
              style={{width: 300, height: 300}}
            />
          </TouchableOpacity>
          <View style = {styles.anothercontainer}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/gps-sign.png')}
              fadeDuration={0}
              style={{width: 175, height: 175}}
            />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000D29',
  },
  newcontainer:{
    alignItems:'center',
    marginTop:100,
    marginBottom:20,
  },
  anothercontainer:{
    alignItems: 'center',
    marginTop:50,
    marginBottom:20
  }
})
