import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {IconSearch} from '../../assets';
import {colors, fonts} from '../../utils';
import Gap from '../gap';

const InputSearch = ({value, onChangeText, onBlur, placeholder}) => {
  return (
    <View style={styles.container}>
      <IconSearch />
      <Gap width={16} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholder={placeholder || 'Cari resep'}
        placeholderTextColor={colors.textGrey}
        returnKeyType="search"
        onBlur={onBlur}
      />
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    height: 55,
    marginHorizontal: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderColor: colors.textGrey,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.SofiaPro,
  },
});
