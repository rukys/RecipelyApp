import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import {ImgDefault} from '../../assets';
import Gap from '../gap';

const CardProfileDetail = ({img, fullName, email, onPress}) => {
  return (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center bg-white shadow-md rounded-lg p-4 ',
      )}
      onPress={onPress}>
      <FastImage
        style={tw.style('h-12 w-12 rounded-full')}
        source={img ? {uri: img} : ImgDefault}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Gap width={16} />
      <View style={tw.style('flex-1')}>
        <Text style={tw.style('font-sofiaBold text-textPrimary text-lg')}>
          {fullName}
        </Text>
        <Text style={tw.style('font-sofia text-sm text-darkGrey')}>
          {email}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardProfileDetail;
