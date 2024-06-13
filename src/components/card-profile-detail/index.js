import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../../utils';
import {IconArrowRight, ImgDefault} from '../../assets';
import Gap from '../gap';

const CardProfileDetail = ({img, fullName, email, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage
        style={styles.image}
        source={img ? {uri: img} : ImgDefault}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Gap width={16} />
      <View style={styles.flex}>
        <Text style={styles.textFullname}>{fullName}</Text>
        <Text style={styles.textEmail}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.containerRight}>
        <IconArrowRight />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardProfileDetail;

const styles = StyleSheet.create({
  container: {
    // height: 80,
    backgroundColor: colors.white,
    elevation: 2,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
  },
  textFullname: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  textEmail: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.darkGrey,
  },
  containerRight: {
    height: 24,
    width: 24,
    backgroundColor: colors.textPrimary,
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
