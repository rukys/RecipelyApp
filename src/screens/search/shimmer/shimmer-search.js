import React from 'react';
import {View} from 'react-native';
import tw from '../../../../tailwind';
import {Gap, Shimmer} from '../../../components';

const ShimmerSearch = () => {
  return (
    <View style={tw.style('flex-1 flex-row ml-1.5 p-2.5')}>
      <Shimmer style={tw.style('h-20 w-24 rounded')} />
      <Gap width={16} />
      <View style={tw.style('flex-1 mr-2')}>
        <Shimmer style={tw.style('w-full mt-2 h-4 rounded')} />
        <Shimmer style={tw.style('w-full mt-2 h-4 rounded')} />
        <Shimmer style={tw.style('w-32 mt-2 h-4 rounded')} />
      </View>
    </View>
  );
};

export default ShimmerSearch;
