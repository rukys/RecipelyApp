import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Gap, Shimmer} from '../../../components';

const ShimmerRecipe = () => {
  return (
    <View style={styles.container}>
      <Shimmer style={styles.shimmerImage} />
      <Gap width={16} />
      <View style={styles.containerSub}>
        <Shimmer style={styles.shimmerText} />
        <Shimmer style={styles.shimmerText} />
        <Shimmer style={styles.shimmerSubText} />
      </View>
    </View>
  );
};

export default ShimmerRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 6,
    padding: 10,
  },
  containerSub: {
    flex: 1,
    marginRight: 8,
  },
  shimmerImage: {
    height: 80,
    width: 100,
    borderRadius: 8,
  },
  shimmerText: {
    width: '100%',
    marginTop: 8,
    height: 16,
    borderRadius: 5,
  },
  shimmerSubText: {
    width: 125,
    marginTop: 8,
    height: 16,
    borderRadius: 5,
  },
});
