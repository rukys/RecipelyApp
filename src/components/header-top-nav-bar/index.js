import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../../tailwind';
import Gap from '../gap';

const HeaderTopNavBar = ({title}) => {
  return (
    <View style={tw.style('flex-1 flex-row items-center mx-4 mt-4')}>
      <Gap width={5} />
      <Text
        style={tw.style('flex-1 font-sofiaBold text-base text-textPrimary')}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderTopNavBar;
