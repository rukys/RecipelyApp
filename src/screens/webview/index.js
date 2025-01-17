import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {WebView} from 'react-native-webview';
import tw from '../../../tailwind';
import {Header} from '../../components';

export default function WebviewScreen({route}) {
  const {url, titleHeader} = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        backgroundColor={tw.color('primary')}
        barStyle={'light-content'}
      />
      <Header
        title={titleHeader}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <WebView source={{uri: url}} style={tw.style('flex-1 bg-white')} />
    </View>
  );
}
