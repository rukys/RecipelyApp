import React from 'react';
import {TextInput, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';

const InputSearch = ({
  value,
  onChangeText,
  onBlur,
  placeholder,
  isDarkMode = false,
}) => {
  return (
    <View
      style={tw.style(
        'h-14 mx-4 border px-4 flex-row items-center rounded-lg',
        isDarkMode ? 'border-white' : 'border-textGrey',
      )}>
      <FontAwesomeIcon
        name="magnifying-glass"
        size={20}
        color={tw.color(isDarkMode ? 'white' : 'textPrimary')}
      />
      <Gap width={16} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={tw.style(
          'flex-1 text-base font-sofia',
          isDarkMode ? 'text-white' : 'text-textPrimary',
        )}
        placeholder={placeholder || 'Cari resep'}
        placeholderTextColor={tw.color(isDarkMode ? 'text-white' : 'textGrey')}
        returnKeyType="search"
        onBlur={onBlur}
      />
    </View>
  );
};

export default InputSearch;
