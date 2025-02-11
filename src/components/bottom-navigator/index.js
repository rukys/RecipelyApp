/* eslint-disable no-shadow */
import React from 'react';
import {View} from 'react-native';
import tw from '../../../tailwind';
import TabItem from '../tab-item';
import {themeStore} from '../../stores';

const BottomNavigator = ({state, descriptors, navigation}) => {
  const isDarkMode = themeStore(state => state.isDarkMode);
  return (
    <View style={tw.style('bg-white')}>
      <View
        style={tw.style(
          'flex-row justify-between px-12 py-4 shadow-2xl',
          isDarkMode ? 'bg-black border-t border-grey' : 'bg-white',
        )}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              key={index}
              size={22}
              title={label}
              active={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavigator;
