import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, fonts} from '../../utils';
import Gap from '../gap';
import {IconBolt, IconDot, IconTimeCircle} from '../../assets';

const CardSearch = ({img, title, difficulty, time, onPress}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <FastImage
          style={styles.image}
          source={{uri: img}}
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
              <Text style={styles.textSubTitle}>{time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardSearch;

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
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.SofiaPro,
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
