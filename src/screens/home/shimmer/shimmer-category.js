import React from 'react';
import {View} from 'react-native';
import tw from '../../../../tailwind';
import {Shimmer} from '../../../components';

const ShimmerCategory = () => {
  return (
    <View>
      <Shimmer style={tw.style('h-10 w-24 rounded-3xl')} />
    </View>
  );
};

export default ShimmerCategory;
