import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import {IconBolt, IconDot, IconTimeCircle} from '../../assets';
import Gap from '../gap';

const CardSearch = ({img, title, difficulty, time, onPress}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style(
          'h-24 bg-white mx-4 shadow rounded-lg mt-2 p-2.5 flex-row',
        )}
        onPress={onPress}>
        <FastImage
          style={tw.style('w-24 rounded')}
          source={{uri: img}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Gap width={12} />
        <View style={tw.style('flex-1')}>
          <Text style={tw.style('flex-1 text-md font-sofia text-textPrimary')}>
            {title}
          </Text>
          <Gap height={8} />
          <View>
            <View style={tw.style('flex-row items-center')}>
              <IconBolt />
              <Gap width={3} />
              <Text style={tw.style('font-sofia text-md text-textGrey')}>
                {difficulty}
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
        </View>
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardSearch;
