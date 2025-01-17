import React from 'react';
import {View} from 'react-native';
import tw from '../../../../tailwind';
import {Gap, Shimmer} from '../../../components';

const ShimmerRecipeByCategory = () => {
  return (
    <View>
      <Shimmer style={tw.style('w-52 h-36 rounded mt-2')} />
      <Gap height={8} />
      <Shimmer style={tw.style('w-52 h-4 rounded')} />
      <Gap height={8} />
      <Shimmer style={tw.style('w-36 h-4 rounded')} />
    </View>
  );
};

export default ShimmerRecipeByCategory;
