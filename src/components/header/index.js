import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconArrowLeft} from '../../assets';
import {colors, fonts} from '../../utils';

const Header = ({title, onPressBack, isHideLeft = false, textStyle}) => {
  return (
    <View style={styles.container}>
      {!isHideLeft ? (
        <TouchableOpacity onPress={onPressBack} style={styles.back}>
          <IconArrowLeft />
        </TouchableOpacity>
      ) : null}
      <View style={styles.flex}>
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  back: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.SofiaProBold,
    color: colors.textPrimary,
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
});
