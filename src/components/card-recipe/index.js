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
      <TouchableOpacity
        style={tw.style('w-48 rounded-lg shadow bg-white p-2.5 mb-2 mt-2')}
        onPress={onPress}>
        <View>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            source={{uri: img}}
            style={tw.style('h-36 rounded')}
          />
          <TouchableOpacity
            style={tw.style(
              'absolute right-0 mt-2 mr-2 bg-white h-7 w-7 justify-center items-center rounded-lg',
            )}
            onPress={onPressFav}>
            <IconHeartMini />
          </TouchableOpacity>
        </View>
        <Gap height={12} />
        <View>
          <Text
            style={tw.style('font-sofia text-md text-textPrimary')}
            numberOfLines={3}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Gap height={8} />
          <View style={tw.style('flex-row items-center')}>
            {calories ? <IconCalories /> : <IconBolt />}
            <Gap width={3} />
            <Text style={tw.style('font-sofia text-md text-textGrey')}>
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

export default CardRecipe;
