import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Gap, Shimmer} from '../../../components';

const ShimmerNewRecipe = () => {
  return (
    <View>
      <Shimmer style={styles.shimmerNewRecipe} />
      <Gap height={8} />
      <Shimmer style={styles.shimmerTextNewRecipe} />
      <Gap height={8} />
      <Shimmer style={styles.shimmerTextSubNewRecipe} />
    </View>
  );
};

export default ShimmerNewRecipe;

const styles = StyleSheet.create({
  shimmerNewRecipe: {
    width: 264,
    height: 172,
    borderRadius: 8,
    marginTop: 8,
  },
  shimmerTextNewRecipe: {
    width: 264,
    height: 16,
    borderRadius: 5,
  },
  shimmerTextSubNewRecipe: {
    width: 150,
    height: 16,
    borderRadius: 5,
  },
});
