import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';

const CardRecipe = ({
  img,
  title,
  calories,
  difficulty,
  time,
  onPress,
  isFavorite,
  isDarkMode = false,
  onPressFav = () => {},
}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style(
          'w-48 rounded-lg shadow p-2.5 mb-2 mt-2',
          isDarkMode ? 'bg-black' : 'bg-white',
        )}
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
            <FontAwesomeIcon
              name="heart"
              size={16}
              color={tw.color('textPrimary')}
            />
          </TouchableOpacity>
        </View>
        <Gap height={12} />
        <View>
          <Text
            style={tw.style(
              'font-sofia text-md',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            )}
            numberOfLines={3}
            ellipsizeMode="tail">
            {title}
          </Text>
          <Gap height={8} />
          <View style={tw.style('flex-row items-center')}>
            <FontAwesomeIcon
              name={calories ? 'fire' : 'bolt'}
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

export default CardRecipe;
