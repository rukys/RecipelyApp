import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import {Gap, Header} from '../../components';
import {themeStore} from '../../stores';

export default function ContactMeScreen({navigation}) {
  const isDarkMode = themeStore(state => state.isDarkMode);
  return (
    <ScrollView
      style={tw.style('flex-1', isDarkMode ? 'bg-black' : 'bg-white')}>
      <Header
        title="Hubungi Kami"
        isWhite={isDarkMode}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={tw.style('flex-1 mx-4')}>
        <Gap height={8} />
        <Text
          style={tw.style(
            'font-sofiaLight text-lg',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          Hubungi kami di
        </Text>
        <Gap height={16} />
        <View style={tw.style('flex-row items-center')}>
          <FontAwesomeIcon
            name={'envelope'}
            size={22}
            color={tw.color(isDarkMode ? 'white' : 'textPrimary')}
          />
          <Gap width={16} />
          <Text
            style={tw.style(
              'font-sofiaLight text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            ruky.sektiawan@gmail.com
          </Text>
        </View>
        <Gap height={16} />
        <View style={tw.style('flex-row items-center')}>
          <FontAwesomeIcon
            name={'whatsapp'}
            size={22}
            color={tw.color(isDarkMode ? 'white' : 'textPrimary')}
          />
          <Gap width={16} />
          <Text
            style={tw.style(
              'font-sofiaLight text-md',
              isDarkMode ? 'text-white' : 'textPrimary',
            )}>
            +62 896 0315 3944
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
