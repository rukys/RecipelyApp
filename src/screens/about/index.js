import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import tw from '../../../tailwind';
import {Gap, Header} from '../../components';

export default function AboutScreen({navigation}) {
  return (
    <ScrollView style={tw.style('flex-1 bg-white')}>
      <Header
        title="Tentang Aplikasi"
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <Gap height={16} />
      <View style={tw.style('flex-1 mx-4')}>
        <Text
          style={tw.style('font-sofia text-textPrimary text-center text-md')}>
          Selamat datang di Recipely, aplikasi masakan harian yang akan menjadi
          asisten dapur Anda! Dengan Recipely, Anda dapat menjelajahi berbagai
          resep masakan dari seluruh dunia, menemukan inspirasi untuk hidangan
          harian, dan mempelajari cara memasak dengan mudah.
        </Text>
        <Text
          style={tw.style('font-sofia text-textPrimary text-center text-md')}>
          Dengan Recipely, memasak menjadi lebih menyenangkan dan kreatif. Unduh
          sekarang dan mulailah petualangan kuliner Anda!
        </Text>
        <Gap height={24} />
        <Text
          style={tw.style(
            'font-sofiaBold text-base text-textPrimary text-center',
          )}>
          Unduh Recipely dan temukan keajaiban di dapur Anda setiap hari!
        </Text>
        <Gap height={16} />
        <View style={tw.style('items-center')}>
          <Text
            style={tw.style(
              'font-sofiaExtraLight text-sm text-textGrey text-center',
            )}>
            Recipely
          </Text>
          <Text
            style={tw.style(
              'font-sofiaExtraLight text-textGrey text-sm text-center',
            )}>
            version {deviceInfoModule.getVersion()}
          </Text>
        </View>
        <Gap height={24} />
      </View>
    </ScrollView>
  );
}
