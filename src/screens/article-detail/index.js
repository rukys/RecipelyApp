import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {colors} from '../../utils';
// import {useNavigation} from '@react-navigation/native';
// import useArticleDetail from '../../hooks/use-article-detail';

export default function ArticleDetailScreen({route}) {
  // const navigation = useNavigation();
  const {key} = route.params || {};

  const replaceKey = key.replace(/\s+/g, '-').toLowerCase();
  const url = 'https://www.masakapahariini.com/';

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <WebView
        source={{uri: url + replaceKey}}
        style={styles.page}
        // injectedJavaScript={runFirst}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
