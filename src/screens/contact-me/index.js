import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {Gap, Header} from '../../components';
import {IconEmail, IconWa} from '../../assets';

export default function ContactMeScreen({navigation}) {
  return (
    <ScrollView style={styles.page}>
      <Header
        title="Hubungi Kami"
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <Gap height={8} />
        <Text style={styles.title}>Hubungi kami di</Text>
        <Gap height={16} />
        <View style={[styles.row, styles.center]}>
          <IconEmail />
          <Gap width={16} />
          <Text style={styles.text}>ruky.sektiawan@gmail.com</Text>
        </View>
        <Gap height={16} />
        <View style={[styles.row, styles.center]}>
          <IconWa />
          <Gap width={16} />
          <Text style={styles.text}>+62 896 0315 3944</Text>
        </View>
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
  title: {
    fontFamily: fonts.SofiaPro,
    fontSize: 18,
    color: colors.textPrimary,
  },
  text: {
    fontFamily: fonts.SofiaProLight,
    fontSize: 14,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
});
