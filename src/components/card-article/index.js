import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import Gap from '../gap';

const CartArticle = ({img, title, onPress}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style('rounded-lg shadow bg-white p-3 mb-1.5 mt-1.5')}
        onPress={onPress}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{uri: img}}
          style={tw.style('h-32 rounded')}
        />
        <Gap height={8} />
        <Text
          style={tw.style('font-sofia text-md text-textPrimary')}
          numberOfLines={2}
          ellipsizeMode="tail">
          {title}
        </Text>
      </TouchableOpacity>
      <Gap height={10} />
    </>
  );
};

export default CartArticle;
