import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';

const CardNewRecipe = ({
  img,
  title,
  time,
  difficulty,
  calories,
  isDarkMode = false,
  onPressFav = () => {},
  onPress = () => {},
}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style(
          'w-64 rounded-lg shadow mt-2 mb-2 p-2.5',
          isDarkMode ? 'bg-black' : 'bg-white',
        )}
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
            <FontAwesomeIcon
              name="heart"
              size={16}
              color={tw.color('textPrimary')}
            />
          </TouchableOpacity>
        </View>
        <View style={tw.style('pt-2')}>
          <Text
            style={tw.style(
              'font-sofia text-md text-start',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}
            numberOfLines={2}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Gap height={8} />
          <View style={tw.style('flex-row items-center')}>
            <FontAwesomeIcon
              name={calories ? 'fire' : 'bolt'}
              size={14}
              style={tw.style('mr-1')}
              color={tw.color(isDarkMode ? 'text-white' : 'textGrey')}
            />
            <Gap width={3} />
            <Text
              style={tw.style(
                'font-sofia text-md text-start',
                isDarkMode ? 'text-white' : 'text-textGrey',
              )}>
              {calories ? calories : difficulty}
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
      </TouchableOpacity>
      <Gap width={16} />
    </>
  );
};

export default CardNewRecipe;
