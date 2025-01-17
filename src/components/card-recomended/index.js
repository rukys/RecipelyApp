import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import {IconArrowRight, IconBolt, IconDot, IconTimeCircle} from '../../assets';
import Gap from '../gap';

const CardRecomended = ({Img, title, difficulty, times, onPressInside}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style(
          'h-24 bg-white mx-4 shadow rounded-lg mt-2 p-2.5 flex-row',
        )}
        onPress={onPressInside}>
        <FastImage
          style={tw.style('w-24 rounded')}
          source={{uri: Img}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Gap width={12} />
        <View style={tw.style('flex-1')}>
          <Text style={tw.style('text-md font-sofia text-textPrimary')}>
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
                {times}
              </Text>
            </View>
          </View>
        </View>
        <Gap width={12} />
        <TouchableOpacity
          style={tw.style(
            'h-6 w-6 bg-textPrimary self-center rounded-lg justify-center items-center',
          )}
          onPress={onPressInside}>
          <IconArrowRight />
        </TouchableOpacity>
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardRecomended;
