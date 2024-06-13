import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../../utils';
import {
  IconBolt,
  IconCalories,
  IconDot,
  IconHeartMini,
  IconTimeCircle,
} from '../../assets';
import Gap from '../gap';

const CardRecipe = ({
  img,
  title,
  calories,
  difficulty,
  time,
  onPress,
  isFavorite,
  onPressFav = () => {},
}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{uri: img}}
            style={styles.image}
          />
          <TouchableOpacity style={styles.containerFav} onPress={onPressFav}>
            <IconHeartMini />
          </TouchableOpacity>
        </View>
        <Gap height={12} />
        <View style={styles.containerDesc}>
          <Text style={styles.textTitle} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>
          <Gap height={8} />
          <View style={[styles.row, styles.center]}>
            {calories ? <IconCalories /> : <IconBolt />}
            <Gap width={3} />
            <Text style={styles.textSubTitle}>
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

export default CardRecipe;

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 8,
    marginTop: 8,
  },
  image: {
    height: 150,
    borderRadius: 10,
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
    borderRadius: 8,
  },
  containerDesc: {},
  textTitle: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textPrimary,
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
