/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';

const CardFavorite = ({
  img,
  title,
  difficulty,
  time,
  isDarkMode = false,
  onPress = () => {},
}) => {
  return (
    <>
      <Gap width={16} />
      <TouchableOpacity
        style={[
          tw.style(
            'mb-4 rounded-lg p-2.5 shadow-md',
            isDarkMode ? 'bg-black' : 'bg-white',
          ),
          {width: '44%'},
        ]}
        onPress={onPress}>
        <FastImage
          source={{uri: img}}
          resizeMode={FastImage.resizeMode.cover}
          style={tw.style('h-24 w-full rounded')}
        />
        <Gap height={8} />
        <Text
          style={tw.style(
            'flex-1 w-full font-sofia text-md text-start',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}
          numberOfLines={4}
          ellipsizeMode="tail">
          {title}
        </Text>
        <Gap height={8} />
        <View style={tw.style('flex-row items-center')}>
          <FontAwesomeIcon
            name={'bolt'}
            size={14}
            style={tw.style('mr-1')}
            color={tw.color(isDarkMode ? 'white' : 'textGrey')}
          />
          <Gap width={3} />
          <Text
            style={tw.style(
              'font-sofia text-md text-start',
              isDarkMode ? 'text-white' : 'text-textGrey',
            )}>
            {difficulty}
          </Text>
        </View>
        <View style={tw.style('flex-row items-center')}>
          <FontAwesomeIcon
            name="clock"
            size={16}
            style={tw.style('mr-1')}
            color={tw.color(isDarkMode ? 'white' : 'textGrey')}
          />
          <Gap width={3} />
          <Text
            style={tw.style(
              'font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textGrey',
            )}>
            {time}
          </Text>
        </View>
        <Gap height={8} />
      </TouchableOpacity>
    </>
  );
};

export default CardFavorite;
