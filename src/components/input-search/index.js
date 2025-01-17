import React from 'react';
import {TextInput, View} from 'react-native';
import tw from '../../../tailwind';
import {IconSearch} from '../../assets';
import Gap from '../gap';

const InputSearch = ({value, onChangeText, onBlur, placeholder}) => {
  return (
    <View
      style={tw.style(
        'h-14 mx-4 border px-4 flex-row items-center rounded-lg border-textGrey',
      )}>
      <IconSearch />
      <Gap width={16} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={tw.style('flex-1 text-base text-textPrimary font-sofia')}
        placeholder={placeholder || 'Cari resep'}
        placeholderTextColor={tw.color('textGrey')}
        returnKeyType="search"
        onBlur={onBlur}
      />
    </View>
  );
};

export default InputSearch;
