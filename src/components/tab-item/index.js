/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import {themeStore} from '../../stores';

const TabItem = ({title, active, size, onPress, onLongPress}) => {
  // const {dataProfile} = useProfile();

  const isDarkMode = themeStore(state => state.isDarkMode);

  const Icon = () => {
    if (title === 'HomeScreen') {
      return (
        <FontAwesomeIcon
          name="house"
          size={size}
          color={tw.color(
            active ? (isDarkMode ? 'white' : 'primary') : 'textGrey',
          )}
        />
      );
    }
    if (title === 'SearchScreen') {
      return (
        <FontAwesomeIcon
          name="magnifying-glass"
          size={size}
          color={tw.color(
            active ? (isDarkMode ? 'white' : 'primary') : 'textGrey',
          )}
        />
      );
    }
    if (title === 'FavoriteScreen') {
      return (
        <FontAwesomeIcon
          name="heart"
          iconStyle="solid"
          size={size}
          color={tw.color(
            active ? (isDarkMode ? 'white' : 'primary') : 'textGrey',
          )}
        />
      );
    }
    if (title === 'ProfileScreen') {
      return (
        <FontAwesomeIcon
          name="user"
          size={size}
          color={tw.color(
            active ? (isDarkMode ? 'white' : 'primary') : 'textGrey',
          )}
        />
      );
    }
  };

  return (
    <TouchableOpacity
      style={tw.style('items-center')}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default TabItem;
