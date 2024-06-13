import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {colors} from '../../utils';
import {Header} from '../../components';

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();
  const url =
    'https://doc-hosting.flycricket.io/recipely-privacy-policy/69246cfd-3062-4cb0-abdd-7e8234e7a0c0/privacy';

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} />
      <Header
        title="Kebijakan dan Privasi"
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
