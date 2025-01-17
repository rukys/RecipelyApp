import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import tw from '../../../tailwind';
import {IconEmail, IconWa} from '../../assets';
import {Gap, Header} from '../../components';

export default function ContactMeScreen({navigation}) {
  return (
    <ScrollView style={tw.style('flex-1 bg-white')}>
      <Header
        title="Hubungi Kami"
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={tw.style('flex-1 mx-4')}>
        <Gap height={8} />
        <Text style={tw.style('font-sofiaLight text-lg text-textPrimary')}>
          Hubungi kami di
        </Text>
        <Gap height={16} />
        <View style={tw.style('flex-row items-center')}>
          <IconEmail />
          <Gap width={16} />
          <Text style={tw.style('font-sofiaLight text-md text-textPrimary')}>
            ruky.sektiawan@gmail.com
          </Text>
        </View>
        <Gap height={16} />
        <View style={tw.style('flex-row items-center')}>
          <IconWa />
          <Gap width={16} />
          <Text style={tw.style('font-sofiaLight text-md text-textPrimary')}>
            +62 896 0315 3944
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
