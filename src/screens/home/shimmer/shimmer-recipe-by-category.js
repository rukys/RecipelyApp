import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Gap, Shimmer} from '../../../components';

const ShimmerRecipeByCategory = () => {
  return (
    <View style={styles.containerNewRecipe}>
      <Shimmer style={styles.shimmerRecipeByCategory} />
      <Gap height={8} />
      <Shimmer style={styles.shimmerTextRecipeByCategory} />
      <Gap height={8} />
      <Shimmer style={styles.shimmerTextSubRecipeByCategory} />
    </View>
  );
};

export default ShimmerRecipeByCategory;

const styles = StyleSheet.create({
  shimmerRecipeByCategory: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  shimmerTextRecipeByCategory: {
    width: 200,
    height: 16,
    borderRadius: 5,
  },
  shimmerTextSubRecipeByCategory: {
    width: 150,
    height: 16,
    borderRadius: 5,
  },
});
