import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import {ImgDefault} from '../../assets';
import Gap from '../gap';
import {themeStore} from '../../stores';

const CardProfileDetail = ({img, fullName, email, onPress}) => {
  const isDarkMode = themeStore(state => state.isDarkMode);
  return (
    <TouchableOpacity
      style={tw.style(
        'flex-row items-center shadow-md rounded-lg p-4 ',
        isDarkMode ? 'bg-black border border-grey' : 'bg-white',
      )}
      onPress={onPress}>
      <FastImage
        style={tw.style('h-12 w-12 rounded-full')}
        source={img ? {uri: img} : ImgDefault}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Gap width={16} />
      <View style={tw.style('flex-1')}>
        <Text
          style={tw.style(
            'font-sofiaBold text-lg',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          {fullName}
        </Text>
        <Text
          style={tw.style(
            'font-sofia text-sm',
            isDarkMode ? 'text-white' : 'text-darkGrey',
          )}>
          {email}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardProfileDetail;
