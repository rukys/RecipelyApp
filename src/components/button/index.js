import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import tw from '../../../tailwind';

const Button = ({
  title,
  style,
  textStyle,
  type,
  onPress,
  isLoading,
  disabled,
}) => {
  if (type === 'text') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          tw.style('w-full h-12 justify-center items-center rounded-lg'),
          style,
        ]}>
        <Text
          style={[tw.style('text-white text-base font-sofiaBold'), textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[
        tw.style(
          'w-full h-12 bg-buttonPrimary justify-center items-center rounded-lg',
        ),
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator color={tw.color('white')} />
      ) : (
        <Text style={tw.style('text-white text-base font-sofiaBold')}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
