import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Audio, Permissions } from 'expo';
import { App } from '../App.js';

import { MonoText } from '../components/StyledText';

async function uploadAudioAsync(uri) {
  const secretApiKey = 'H1MlrkJqLrhplKhmhRS3P1aQQ7F6qSjdaSdRFNbw6EG5';
  const apiUrl = `https://apikey:${secretApiKey}@stream.watsonplatform.net/speech-to-text/api/v1/recognize`;
  console.log('Uploading ' + uri);
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('file', {
    uri,
    name: `recording.${fileType}`,
    type: `audio/x-${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log('POSTing ' + uri + ' to ' + apiUrl);
  return fetch(apiUrl, options);
}

export default class HomeScreen extends React.Component {
  recording = null;
  sound = null;
  state = { isRecording: false };
  record = null;

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              Hold microphone button to record
            </Text>
          </View>
          <View style={styles.welcomeContainer}>
            <TouchableOpacity
              onPress={() => this._changeRecording(this.state.isRecording)}
            >
              <Image
                source={require('../assets/images/microphone.png')}
                style={styles.welcomeImage}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }

  _changeRecording = async state => {
    //alert(state);
    if (state) {
      await this._stopRecording(this.record);
    } else {
      this.record = await this._startRecording();
    }
  };

  _stopRecording = async recording => {
    let responseBody;

    // setTimeout(async () => {
    await recording.stopAndUnloadAsync();
    console.log(recording.getURI());

    const uri = await recording.getURI();
    const results = await uploadAudioAsync(uri);
    console.log(results);

    this.setState({
      isRecording: false,
    });
  };

  _startRecording = async () => {
    this.setState({
      isRecording: true,
    });

    console.log('start recording');

    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    // has a bug, needs work
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await recording.startAsync();
      return recording;
    } catch (error) {
      alert(error);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
