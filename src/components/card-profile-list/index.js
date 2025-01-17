import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import tw from '../../../tailwind';
import {IconArrowRight2} from '../../assets';
import Gap from '../gap';

const CardProfileList = ({icon, title, iconRight, onPress = () => {}}) => {
  return (
    <>
      <TouchableOpacity
        style={tw.style('h-11 flex-row items-center')}
        onPress={onPress}>
        {icon}
        <Gap width={16} />
        <Text style={tw.style('flex-1 font-sofia text-base text-textPrimary')}>
          {title}
        </Text>
        <Gap width={16} />
        {iconRight ? iconRight : <IconArrowRight2 />}
      </TouchableOpacity>
      <Gap height={8} />
    </>
  );
};

export default CardProfileList;
