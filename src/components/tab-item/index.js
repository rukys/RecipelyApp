/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  NavHeart,
  NavHeartFill,
  NavHome,
  NavHomeFill,
  NavProfile,
  NavProfileFill,
  NavSearch,
  NavSearchFill,
} from '../../assets';

const TabItem = ({title, active, size, onPress, onLongPress}) => {
  // const {dataProfile} = useProfile();

  const Icon = () => {
    if (title === 'HomeScreen') {
      if (active) {
        return <NavHomeFill />;
      } else {
        return <NavHome />;
      }
    }
    if (title === 'SearchScreen') {
      if (active) {
        return <NavSearchFill />;
      } else {
        return <NavSearch />;
      }
    }
    if (title === 'FavoriteScreen') {
      if (active) {
        return <NavHeartFill />;
      } else {
        return <NavHeart />;
      }
    }
    if (title === 'ProfileScreen') {
      if (active) {
        return <NavProfileFill />;
      } else {
        return <NavProfile />;
      }
    }
    return <NavHome />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
