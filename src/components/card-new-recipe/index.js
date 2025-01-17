import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import {
  IconBolt,
  IconCalories,
  IconDot,
  IconHeartMini,
  IconTimeCircle,
} from '../../assets';
import Gap from '../gap';

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
      <TouchableOpacity
        style={tw.style('w-64 bg-white rounded-lg shadow mt-2 mb-2 p-2.5')}
        onPress={onPress}>
        <View>
          <FastImage
            source={{uri: img}}
            resizeMode={FastImage.resizeMode.cover}
            style={tw.style('rounded h-40')}
          />
          <TouchableOpacity
            style={tw.style(
              'absolute right-0 mt-2 mr-2 bg-white h-7 w-7 justify-center items-center rounded-lg',
            )}
            onPress={onPressFav}>
            <IconHeartMini />
          </TouchableOpacity>
        </View>
        <View style={tw.style('pt-2')}>
          <Text
            style={tw.style('font-sofia text-textPrimary text-md text-start')}
            numberOfLines={2}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Gap height={8} />
          <View style={tw.style('flex-row items-center')}>
            {calories ? <IconCalories /> : <IconBolt />}
            <Gap width={3} />
            <Text
              style={tw.style('font-sofia text-textGrey text-md text-start')}>
              {calories ? calories : difficulty}
            </Text>
            <Gap width={8} />
            <View style={tw.style('self-center')}>
              <IconDot />
            </View>
            <Gap width={8} />
            <IconTimeCircle />
            <Gap width={3} />
            <Text style={tw.style('font-sofia text-md text-textGrey')}>
              {time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Gap width={16} />
    </>
  );
};

export default CardNewRecipe;
