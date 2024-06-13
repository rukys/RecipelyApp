import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../utils';
import Gap from '../gap';
import {IconArrowRight2} from '../../assets';

const CardProfileList = ({icon, title, iconRight, onPress = () => {}}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {icon}
        <Gap width={16} />
        <Text style={styles.textTitle}>{title}</Text>
        <Gap width={16} />
        {iconRight ? iconRight : <IconArrowRight2 />}
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardProfileList;

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 0.5,
    // borderBottomColor: colors.textGrey,
  },
  textTitle: {
    flex: 1,
    fontFamily: fonts.SofiaPro,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
