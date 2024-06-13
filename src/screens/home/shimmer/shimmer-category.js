import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Shimmer} from '../../../components';

const ShimmerCategory = () => {
  return (
    <View>
      <Shimmer style={styles.shimmerButtonCategory} />
    </View>
  );
};

export default ShimmerCategory;

const styles = StyleSheet.create({
  shimmerButtonCategory: {
    height: 40,
    width: 100,
    borderRadius: 40,
  },
});
