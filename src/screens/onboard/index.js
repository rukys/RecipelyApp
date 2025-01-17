import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import tw from '../../../tailwind';
import {ImgFoody, ImgPattern} from '../../assets';
import {Button, Gap} from '../../components';

export default function OnboardScreen({navigation}) {
  return (
    <>
      <StatusBar backgroundColor={tw.color('primary')} />
      <View
        style={tw.style('flex-1 bg-primary justify-center items-center px-8')}>
        <View style={tw.style('absolute')}>
          <ImgPattern />
        </View>
        <ImgFoody width={280} />
        <Gap height={64} />
        <Text
          style={tw.style('text-2xl text-white font-sofiaBold text-center')}>
          Jalan Sehatmu Dimulai dari Dapur yang Bahagia
        </Text>
        <Gap height={24} />
        <Button
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
