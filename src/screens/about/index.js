import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import {colors, fonts} from '../../utils';
import {Gap, Header} from '../../components';

export default function AboutScreen({navigation}) {
  return (
    <ScrollView style={styles.page}>
      <Header
        title="Tentang Aplikasi"
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <Gap height={16} />
      <View style={styles.content}>
        <Text style={styles.textDesc}>
          Selamat datang di Recipely, aplikasi masakan harian yang akan menjadi
          asisten dapur Anda! Dengan Recipely, Anda dapat menjelajahi berbagai
          resep masakan dari seluruh dunia, menemukan inspirasi untuk hidangan
          harian, dan mempelajari cara memasak dengan mudah.
        </Text>
        <Text style={styles.textDesc}>
          Dengan Recipely, memasak menjadi lebih menyenangkan dan kreatif. Unduh
          sekarang dan mulailah petualangan kuliner Anda!
        </Text>
        <Gap height={24} />
        <Text style={styles.textTitle}>
          Unduh Recipely dan temukan keajaiban di dapur Anda setiap hari!
        </Text>
        <Gap height={16} />
        <View style={styles.center}>
          <Text style={styles.textNameApp}>Recipely</Text>
          <Text style={styles.textVersionApp}>
            version {deviceInfoModule.getVersion()}
          </Text>
        </View>
        <Gap height={24} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
  textDesc: {
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    textAlign: 'center',
    fontSize: 14,
  },
  textTitle: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  center: {
    alignSelf: 'center',
  },
  textNameApp: {
    fontFamily: fonts.SofiaProExtraLight,
    fontSize: 12,
    color: colors.textGrey,
    textAlign: 'center',
  },
  textVersionApp: {
    fontSize: 10,
    fontFamily: fonts.SofiaProExtraLight,
    color: colors.textGrey,
    textAlign: 'center',
  },
});
