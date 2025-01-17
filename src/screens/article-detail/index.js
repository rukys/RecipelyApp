import React from 'react';
import {StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import tw from '../../../tailwind';

export default function ArticleDetailScreen({route}) {
  const {key} = route.params || {};

  const replaceKey = key.replace(/\s+/g, '-').toLowerCase();
  const url = 'https://www.masakapahariini.com/';

  return (
    <>
      <StatusBar
        backgroundColor={tw.color('primary')}
        barStyle={'light-content'}
      />
      <WebView
        source={{uri: url + replaceKey}}
        style={tw.style('flex-1 bg-white')}
      />
    </>
  );
}
