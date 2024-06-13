import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Gap, Shimmer} from '../../../components';

const ShimmerArticle = () => {
  return (
    <View>
      <Shimmer style={styles.shimmerArticle} />
      <Gap height={8} />
      <Shimmer style={styles.shimmerTextArticle} />
    </View>
  );
};

export default ShimmerArticle;

const styles = StyleSheet.create({
  shimmerArticle: {
    width: '100%',
    height: 125,
    borderRadius: 8,
  },
  shimmerTextArticle: {
    borderRadius: 5,
    height: 16,
  },
});
