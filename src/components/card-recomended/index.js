import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../../utils';
import Gap from '../gap';
import {IconArrowRight, IconBolt, IconDot, IconTimeCircle} from '../../assets';

const CardRecomended = ({Img, title, difficulty, times, onPressInside}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPressInside}>
        <FastImage
          style={styles.image}
          source={{uri: Img}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Gap width={12} />
        <View style={styles.containerDesc}>
          <Text style={styles.title}>{title}</Text>
          <Gap height={8} />
          <View>
            <View style={[styles.row, styles.center]}>
              <IconBolt />
              <Gap width={3} />
              <Text style={styles.textSubTitle}>{difficulty}</Text>
              <Gap width={8} />
              <View style={styles.centerSelf}>
                <IconDot />
              </View>
              <Gap width={8} />
              <IconTimeCircle />
              <Gap width={3} />
              <Text style={styles.textSubTitle}>{times}</Text>
            </View>
          </View>
        </View>
        <Gap width={12} />
        <TouchableOpacity style={styles.containerRight} onPress={onPressInside}>
          <IconArrowRight />
        </TouchableOpacity>
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardRecomended;

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: colors.white,
    marginHorizontal: 16,
    elevation: 2,
    borderRadius: 16,
    marginTop: 8,
    padding: 10,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    borderRadius: 8,
  },
  containerDesc: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
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
