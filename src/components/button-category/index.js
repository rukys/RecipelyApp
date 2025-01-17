import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import tw from '../../../tailwind';
import Gap from '../gap';

const ButtonCategory = ({id, title, onPress, indexButton, disabled}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style(
          'h-10 rounded-full px-6 justify-center items-center',
          id === indexButton ? 'bg-primary' : 'bg-secondary',
        )}
        onPress={onPress}>
        <Text
          style={tw.style(
            'font-sofia text-base mb-1',
            id === indexButton ? 'text-white' : 'text-textPrimary',
          )}>
          {title}
        </Text>
      </TouchableOpacity>
      <Gap width={10} />
    </>
  );
};

export default ButtonCategory;
