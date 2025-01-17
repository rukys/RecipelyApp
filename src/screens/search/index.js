import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDebounce} from 'use-debounce';
import tw from '../../../tailwind';
import {
  CardRecomended,
  CardSearch,
  Gap,
  Header,
  InputSearch,
} from '../../components';
import useRecipeSearch from '../../hooks/use-recipe-search';
import useRecomended from '../../hooks/use-recomended';
import {useForm} from '../../utils';
import ShimmerRecomended from './shimmer/shimmer-recomended';
import ShimmerSearch from './shimmer/shimmer-search';

export default function SearchScreen({navigation}) {
  const [form, setForm] = useForm({
    keyword: '',
  });

  const [debouncedKeyword] = useDebounce(form?.keyword, 400);

  const {resultRecomended, isLoading} = useRecomended();
  const {resultRecipeSearch, isLoadingRecipeSearch} =
    useRecipeSearch(debouncedKeyword);

  const onNavigateDetail = data => {
    navigation.navigate('RecipeDetailScreen', data);
  };

  const onNavigateRecomended = data => {
    navigation.navigate('RecipeDetailScreen', data);
  };

  return (
    <>
      <View style={tw.style('flex-1 bg-white')}>
        <Header title="Pencarian" isHideLeft />
        <Gap height={8} />
        <InputSearch
          value={form?.keyowrd}
          placeholder="Explore resep"
          onChangeText={value => {
            setForm('keyword', value);
          }}
        />
        <Gap height={16} />
        {debouncedKeyword !== '' ? (
          <>
            <Text
              style={tw.style('text-md text-textGrey font-sofia ml-5 mx-4')}>
              Hasil pencarian untuk{' '}
              <Text
                style={tw.style(
                  'text-md text-textPrimary font-sofiaBold mx-4',
                )}>
                "{debouncedKeyword}"
              </Text>
            </Text>
            <Gap height={4} />
            <ScrollView>
              {isLoadingRecipeSearch
                ? [1, 2, 3, 4, 5].map(key => (
                    <>
                      <ShimmerSearch key={key} />
                      <Gap height={8} />
                    </>
                  ))
                : resultRecipeSearch.map((item, index) => {
                    return (
                      <CardSearch
                        img={item.thumb}
                        title={item.title}
                        time={item.times}
                        difficulty={item.difficulty}
                        key={index}
                        onPress={() => {
                          onNavigateDetail(item);
                        }}
                      />
                    );
                  })}
              <Gap height={24} />
            </ScrollView>
          </>
        ) : (
          <>
            <View style={tw.style('flex-row')}>
              <Text
                style={tw.style(
                  'flex-1 ml-4 text-textPrimary text-base font-sofiaBold',
                )}>
                Rekomendasi Resep
              </Text>
            </View>
            <Gap height={4} />
            <ScrollView>
              {isLoading
                ? [1, 2, 3, 4, 5].map(key => (
                    <>
                      <ShimmerRecomended key={key} />
                      <Gap height={8} />
                    </>
                  ))
                : resultRecomended.map((item, index) => {
                    return (
                      <CardRecomended
                        key={index}
                        Img={item?.thumb}
                        times={item?.times}
                        difficulty={item?.difficulty}
                        title={item?.title}
                        onPressInside={() => onNavigateRecomended(item)}
                      />
                    );
                  })}
              <Gap height={24} />
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
}
