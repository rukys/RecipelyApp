import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {WebView} from 'react-native-webview';
import tw from '../../../tailwind';
import {Header} from '../../components';
import {themeStore} from '../../stores';

export default function WebviewScreen({route}) {
  const {url, titleHeader} = route.params || {};
  const navigation = useNavigation();

  const isDarkMode = themeStore(state => state.isDarkMode);

  return (
    <View style={tw.style('flex-1', isDarkMode ? 'bg-black' : 'bg-white')}>
      <StatusBar
        backgroundColor={tw.color('primary')}
        barStyle={'light-content'}
      />
      <Header
        title={titleHeader}
        isWhite={isDarkMode}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <WebView
        source={{uri: url}}
        style={tw.style('flex-1', isDarkMode ? 'bg-black' : 'bg-white')}
      />
    </View>
  );
}
