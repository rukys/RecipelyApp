import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import tw from '../../../tailwind';
import Gap from '../gap';

const ButtonCategory = ({
  id,
  title,
  onPress,
  indexButton,
  disabled,
  isDarkMode = false,
}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style(
          'h-10 rounded-full px-6 justify-center items-center',
          id !== indexButton
            ? isDarkMode
              ? 'bg-black border border-white'
              : 'bg-secondary'
            : 'bg-primary',
        )}
        onPress={onPress}>
        <Text
          style={tw.style(
            'font-sofia text-base mb-1',
            id !== indexButton
              ? isDarkMode
                ? 'text-white'
                : 'text-textPrimary'
              : 'text-white',
          )}>
          {title}
        </Text>
      </TouchableOpacity>
      <Gap width={10} />
    </>
  );
};

export default ButtonCategory;
