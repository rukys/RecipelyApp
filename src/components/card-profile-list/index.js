import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';
import {themeStore} from '../../stores';

const CardProfileList = ({icon, title, iconRight, onPress = () => {}}) => {
  const isDarkMode = themeStore(state => state.isDarkMode);
  return (
    <>
      <TouchableOpacity
        style={tw.style('h-11 flex-row items-center')}
        onPress={onPress}>
        {icon}
        <Gap width={16} />
        <Text
          style={tw.style(
            'flex-1 font-sofia text-base',
            isDarkMode ? 'text-white' : 'text-textPrimary',
          )}>
          {title}
        </Text>
        <Gap width={16} />

        {iconRight ? (
          iconRight
        ) : (
          <FontAwesomeIcon
            name={'chevron-right'}
            size={16}
            style={tw.style('mr-1')}
            color={tw.color(isDarkMode ? 'text-white' : 'textPrimary')}
          />
        )}
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardProfileList;
