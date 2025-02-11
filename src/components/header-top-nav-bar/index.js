import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../../tailwind';
import Gap from '../gap';

const HeaderTopNavBar = ({title, isDarkMode = false}) => {
  return (
    <View
      style={tw.style(
        'flex-1 flex-row items-center px-4 pt-6',
        isDarkMode ? 'bg-black' : 'bg-white',
      )}>
      <Gap width={5} />
      <Text
        style={tw.style(
          'flex-1 font-sofiaBold text-base',
          isDarkMode ? 'text-white' : 'text-textPrimary',
        )}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderTopNavBar;
