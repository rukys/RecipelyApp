import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils';

export default function NotificationScreen() {
  return (
    <View style={styles.page}>
      <Text>NotificationScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
