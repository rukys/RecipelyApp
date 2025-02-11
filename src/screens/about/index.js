import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import tw from '../../../tailwind';
import {Gap, Header} from '../../components';
import {themeStore} from '../../stores';

export default function AboutScreen({navigation}) {
  const isDarkMode = themeStore(state => state.isDarkMode);
  return (
    <ScrollView
      style={tw.style('flex-1', isDarkMode ? 'bg-black' : 'bg-white')}>
      <Header
        title="Tentang Aplikasi"
        isWhite={isDarkMode}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <Gap height={16} />
      <View style={tw.style('flex-1 mx-4')}>
        <Text
          style={tw.style(
            'font-sofia text-center text-md',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          Selamat datang di Recipely, aplikasi masakan harian yang akan menjadi
          asisten dapur Anda! Dengan Recipely, Anda dapat menjelajahi berbagai
          resep masakan dari seluruh dunia, menemukan inspirasi untuk hidangan
          harian, dan mempelajari cara memasak dengan mudah.
        </Text>
        <Text
          style={tw.style(
            'font-sofia text-center text-md',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          Dengan Recipely, memasak menjadi lebih menyenangkan dan kreatif. Unduh
          sekarang dan mulailah petualangan kuliner Anda!
        </Text>
        <Gap height={24} />
        <Text
          style={tw.style(
            'font-sofiaBold text-base text-center',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          Unduh Recipely dan temukan keajaiban di dapur Anda setiap hari!
        </Text>
        <Gap height={16} />
        <View style={tw.style('items-center')}>
          <Text
            style={tw.style(
              'font-sofiaExtraLight text-sm text-center',
              isDarkMode ? 'text-white' : 'text-textGrey',
            )}>
            Recipely
          </Text>
          <Text
            style={tw.style(
              'font-sofiaExtraLight text-sm text-center',
              isDarkMode ? 'text-white' : 'text-textGrey',
            )}>
            version {deviceInfoModule.getVersion()}
          </Text>
        </View>
        <Gap height={24} />
      </View>
    </ScrollView>
  );
}
