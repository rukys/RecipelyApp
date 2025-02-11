import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import {themeStore} from '../../stores';

const Header = ({
  isWhite = false,
  title,
  onPressBack,
  isHideLeft = false,
  textStyle,
  style,
}) => {
  const isDarkMode = themeStore(state => state.isDarkMode);
  return (
    <View style={[tw.style('h-16 items-center flex-row mx-4'), style]}>
      {!isHideLeft ? (
        <TouchableOpacity
          onPress={onPressBack}
          style={tw.style('absolute left-0')}>
          <FontAwesomeIcon
            name={'arrow-left'}
            size={20}
            color={tw.color(isWhite ? 'white' : 'textPrimary')}
          />
        </TouchableOpacity>
      ) : null}
      <View style={tw.style('flex-1')}>
        <Text
          style={[
            tw.style(
              'text-lg font-sofiaBold self-center',
              isDarkMode ? 'text-white' : 'text-textPrimary',
            ),
            textStyle,
          ]}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
