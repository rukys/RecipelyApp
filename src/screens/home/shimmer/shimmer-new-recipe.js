import React from 'react';
import {View} from 'react-native';
import tw from '../../../../tailwind';
import {Gap, Shimmer} from '../../../components';

const ShimmerNewRecipe = () => {
  return (
    <View>
      <Shimmer style={tw.style('w-64 h-44 rounded mt-2')} />
      <Gap height={8} />
      <Shimmer style={tw.style('w-64 h-4 rounded')} />
      <Gap height={8} />
      <Shimmer style={tw.style('w-36 h-4 rounded')} />
    </View>
  );
};

export default ShimmerNewRecipe;
