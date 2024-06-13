import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Gap from '../gap';
import {colors, fonts} from '../../utils';

const ButtonCategory = ({id, title, onPress, indexButton, disabled}) => {
  return (
    <>
      <TouchableOpacity
        style={id === indexButton ? styles.container : styles.container2}
        onPress={onPress}>
        <Text style={id === indexButton ? styles.text : styles.text2}>
          {title}
        </Text>
      </TouchableOpacity>
      <Gap width={10} />
    </>
  );
};

export default ButtonCategory;

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    height: 40,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.SofiaPro,
    fontSize: 16,
    marginBottom: 4,
    color: colors.white,
  },
  text2: {
    fontFamily: fonts.SofiaPro,
    fontSize: 16,
    marginBottom: 4,
    color: colors.textPrimary,
  },
});
