import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Gap from '../gap';
import {colors, fonts} from '../../utils';
import {
  IconBolt,
  IconCalories,
  IconDot,
  IconHeartMini,
  IconTimeCircle,
} from '../../assets';

const CardNewRecipe = ({
  img,
  title,
  time,
  difficulty,
  calories,
  onPressFav = () => {},
  onPress = () => {},
}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View>
          <FastImage
            source={{uri: img}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
          />
          <TouchableOpacity style={styles.containerFav} onPress={onPressFav}>
            <IconHeartMini />
          </TouchableOpacity>
        </View>
        <View style={styles.containerLabel}>
          <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Gap height={8} />
          <View style={[styles.row, styles.center]}>
            {calories ? <IconCalories /> : <IconBolt />}
            <Gap width={3} />
            <Text style={styles.textDiff}>
              {calories ? calories : difficulty}
            </Text>
            <Gap width={8} />
            <View style={styles.centerSelf}>
              <IconDot />
            </View>
            <Gap width={8} />
            <IconTimeCircle />
            <Gap width={3} />
            <Text style={styles.textSubTitle}>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Gap width={16} />
    </>
  );
};

export default CardNewRecipe;

const styles = StyleSheet.create({
  container: {
    width: 264,
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 2,
    marginTop: 8,
    marginBottom: 8,
    padding: 10,
  },
  image: {
    borderRadius: 10,
    height: 172,
    // width: 264,
  },
  containerFav: {
    position: 'absolute',
    right: 0,
    marginTop: 8,
    marginRight: 8,
    backgroundColor: colors.white,
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  containerLabel: {
    paddingTop: 8,
  },
  label: {
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: 'left',
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
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
  },
  centerSelf: {
    alignSelf: 'center',
  },
});
