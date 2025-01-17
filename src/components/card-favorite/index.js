/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import {IconBolt, IconTimeCircle} from '../../assets';
import Gap from '../gap';

const CardFavorite = ({img, title, difficulty, time, onPress = () => {}}) => {
  return (
    <>
      <Gap width={16} />
      <TouchableOpacity
        style={[
          tw.style('mb-4 rounded-lg bg-white p-2.5 shadow-md'),
          {width: '44%'},
        ]}
        onPress={onPress}>
        <FastImage
          source={{uri: img}}
          resizeMode={FastImage.resizeMode.cover}
          style={tw.style('h-24 w-full rounded')}
        />
        <Gap height={8} />
        <Text
          style={tw.style(
            'flex-1 w-full font-sofia text-textPrimary text-md text-start',
          )}
          numberOfLines={4}
          ellipsizeMode="tail">
          {title}
        </Text>
        <Gap height={8} />
        <View style={tw.style('flex-row items-center')}>
          <IconBolt />
          <Gap width={3} />
          <Text style={tw.style('font-sofia text-textGrey text-md text-start')}>
            {difficulty}
          </Text>
        </View>
        <View style={tw.style('flex-row items-center')}>
          <IconTimeCircle />
          <Gap width={3} />
          <Text style={tw.style('font-sofia text-md text-textGrey')}>
            {time}
          </Text>
        </View>
        <Gap height={8} />
      </TouchableOpacity>
    </>
  );
};

export default CardFavorite;
