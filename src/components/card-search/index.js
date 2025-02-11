import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';

const CardSearch = ({
  img,
  title,
  difficulty,
  time,
  isDarkMode = false,
  onPress,
}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style(
          'h-24 mx-4 shadow rounded-lg mt-2 p-2.5 flex-row',
          isDarkMode ? 'bg-black' : 'bg-white',
        )}
        onPress={onPress}>
        <FastImage
          style={tw.style('w-24 rounded')}
          source={{uri: img}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Gap width={12} />
        <View style={tw.style('flex-1')}>
          <Text
            style={tw.style(
              'flex-1 text-md font-sofia',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}>
            {title}
          </Text>
          <Gap height={8} />
          <View>
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
                  'font-sofia text-md',
                  isDarkMode ? 'text-white' : 'text-textGrey',
                )}>
                {difficulty}
              </Text>
              <Gap width={8} />
              <View style={tw.style('self-center')}>
                <View
                  style={tw.style(
                    'h-1 w-1 rounded-full',
                    isDarkMode ? 'bg-white' : 'bg-textGrey',
                  )}
                />
              </View>
              <Gap width={8} />
              <FontAwesomeIcon
                name="clock"
                size={16}
                style={tw.style('mr-1')}
                color={tw.color(isDarkMode ? 'text-white' : 'textGrey')}
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
          </View>
        </View>
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardSearch;
