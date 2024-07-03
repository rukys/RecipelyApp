import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {colors} from '../../utils';
import {Header} from '../../components';

export default function WebviewScreen({route}) {
  const {url, titleHeader} = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <Header
        title={titleHeader}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <WebView source={{uri: url}} style={styles.page} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
