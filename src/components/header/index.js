import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from '../../../tailwind';
import {IconArrowLeft, IconArrowLeftWhite} from '../../assets';

const Header = ({
  isWhite = false,
  title,
  onPressBack,
  isHideLeft = false,
  textStyle,
  style,
}) => {
  return (
    <View style={[tw.style('h-16 items-center flex-row mx-4'), style]}>
      {!isHideLeft ? (
        <TouchableOpacity
          onPress={onPressBack}
          style={tw.style('absolute left-0')}>
          {isWhite ? <IconArrowLeftWhite /> : <IconArrowLeft />}
        </TouchableOpacity>
      ) : null}
      <View style={tw.style('flex-1')}>
        <Text
          style={[
            tw.style('text-lg font-sofiaBold text-textPrimary self-center'),
            textStyle,
          ]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
