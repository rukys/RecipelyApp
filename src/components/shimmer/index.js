import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import tw from '../../../tailwind';

const SHIMMER_COLORS = ['#dadee3', '#ebeef2', '#dadee3'];
const VW = Dimensions.get('window').width;
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function Shimmer({style}) {
  const shimmerRef = useRef();

  useEffect(() => {
    if (shimmerRef.current) {
      const facebookAnimated = Animated.stagger(400, [
        shimmerRef.current.getAnimated(),
      ]);
      Animated.loop(facebookAnimated).start();
    }
  }, []);

  return (
    <ShimmerPlaceholder
      ref={shimmerRef}
      style={[tw.style('w-full'), style]}
      width={VW}
      shimmerColors={SHIMMER_COLORS}
      stopAutoRun
    />
  );
}
