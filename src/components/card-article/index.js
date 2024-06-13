import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../../utils';
import Gap from '../gap';

const CartArticle = ({img, title, onPress}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{uri: img}}
          style={styles.image}
        />
        <Gap height={8} />
        <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </TouchableOpacity>
      <Gap height={10} />
    </>
  );
};

export default CartArticle;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 6,
    marginTop: 6,
  },
  image: {
    height: 125,
    borderRadius: 8,
  },
  textTitle: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textPrimary,
  },
});
