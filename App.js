import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Constants, Audio, Permissions } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };



  async componentDidMount() {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    // has a bug, needs work
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
    } catch (error) {
      alert(error);
    }
    
    setTimeout(async () => {
      await recording.stopAndUnloadAsync();
      console.log(recording.getURI());
    
      // await convertSpeechToText(recording);
      // https://cloud.ibm.com/apidocs/speech-to-text
      const secretApiKey = 'kadshflkdsjkhkj5hkj45kjh34kj5h4jkl5';
      const watsonUrl = `https://apikey:${secretApiKey}@stream.watsonplatform.net/speech-to-text/api/v1/recognize`;
    
      // https://cloud.ibm.com/docs/services/speech-to-text/http.html#HTTP-multi
      let formData = new FormData();
      formData.append('metadata', {
        value: JSON.stringify({
          part_content_type: 'audio/mp3',
        }),
          name: `metadata.json`,
          type: `application/json`,
      });
      
      formData.append('upload', {
        uri: recording.getURI(),
        name: `audio.mp3`,
        type: `audio/mp3`,
      });
      
      let options = {
        method: 'POST',
        body: formData,
        headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        },
      };
      
      try {
        let response = await fetch(watsonUrl, options);
        if (response.ok) { // is the HTTP response code 2xx
          let responseBody = await response.text();
          console.log(responseBody);
        } else {
        // 404 4xx 5xx
          console.log('server error');
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
