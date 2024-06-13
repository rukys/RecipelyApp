import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../../utils';
import Gap from '../gap';
import {IconBolt, IconTimeCircle} from '../../assets';

const CardFavorite = ({img, title, difficulty, time, onPress = () => {}}) => {
  return (
    <>
      <Gap width={16} />
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <FastImage
          source={{uri: img}}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.image}
        />
        <Gap height={8} />
        <Text style={styles.title} numberOfLines={4} ellipsizeMode="tail">
          {title}
        </Text>
        <Gap height={8} />
        <View style={[styles.row, styles.center]}>
          <IconBolt />
          <Gap width={3} />
          <Text style={styles.textDiff}>{difficulty}</Text>
        </View>
        <View style={[styles.row, styles.center]}>
          <IconTimeCircle />
          <Gap width={3} />
          <Text style={styles.textSubTitle}>{time}</Text>
        </View>
        <Gap height={8} />
      </TouchableOpacity>
    </>
  );
};

export default CardFavorite;

const styles = StyleSheet.create({
  container: {
    width: '44%',
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 10,
    elevation: 2,
  },
  image: {
    height: 100,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    flex: 1,
    width: '100%',
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  centerSelf: {
    alignSelf: 'center',
  },
  textDiff: {
    fontFamily: fonts.SofiaPro,
    color: colors.textGrey,
    fontSize: 14,
    textAlign: 'left',
  },
  textSubTitle: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textGrey,
  },
});
