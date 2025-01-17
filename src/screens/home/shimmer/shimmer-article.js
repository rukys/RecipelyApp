import React from 'react';
import {View} from 'react-native';
import tw from '../../../../tailwind';
import {Gap, Shimmer} from '../../../components';

const ShimmerArticle = () => {
  return (
    <View>
      <Shimmer style={tw.style('w-full h-32 rounded')} />
      <Gap height={8} />
      <Shimmer style={tw.style('rounded h-4')} />
    </View>
  );
};

export default ShimmerArticle;
