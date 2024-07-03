import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {ImgFoody, ImgPattern} from '../../assets';
import {Button, Gap} from '../../components';
import {colors, fonts} from '../../utils';

export default function OnboardScreen({navigation}) {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.page}>
        <View style={styles.pattern}>
          <ImgPattern />
        </View>
        <ImgFoody width={280} />
        <Gap height={64} />
        <Text style={styles.textTitle}>
          Jalan Sehatmu Dimulai dari Dapur yang Bahagia
        </Text>
        <Gap height={24} />
        <Button
          style={styles.button}
          title="Masuk"
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
        />
        <Gap height={16} />
        <Button
          type="text"
          title="Buat Akun Baru"
          onPress={() => {
            navigation.navigate('SignupScreen');
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  pattern: {
    position: 'absolute',
  },
  textTitle: {
    fontSize: 26,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500',
    fontFamily: fonts.SofiaProBold,
  },
});
