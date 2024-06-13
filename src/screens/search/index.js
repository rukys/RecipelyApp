import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDebounce} from 'use-debounce';
import {colors, fonts, useForm} from '../../utils';
import {
  CardRecomended,
  CardSearch,
  Gap,
  Header,
  InputSearch,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import useRecipeSearch from '../../hooks/use-recipe-search';
import ShimmerRecomended from './shimmer/shimmer-recomended';
import ShimmerSearch from './shimmer/shimmer-search';
import useRecomended from '../../hooks/use-recomended';

export default function SearchScreen() {
  const navigation = useNavigation();
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
      <View style={styles.page}>
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
            <Text style={styles.textSearch}>
              Hasil pencarian untuk{' '}
              <Text style={styles.textSearchSub}>"{debouncedKeyword}"</Text>
            </Text>
            <Gap height={4} />
            <ScrollView style={styles.content}>
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
            <View style={styles.row}>
              <Text style={[styles.textTitle, styles.flex]}>
                Rekomendasi Resep
              </Text>
            </View>
            <Gap height={4} />
            <ScrollView style={styles.content}>
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {},
  textTitle: {
    marginLeft: 16,
    fontSize: 20,
    color: colors.textPrimary,
    fontFamily: fonts.SofiaProBold,
  },
  textSeeAll: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.SofiaProBold,
    marginRight: 16,
  },
  textSearch: {
    fontSize: 14,
    color: colors.textGrey,
    fontFamily: fonts.SofiaPro,
    marginLeft: 20,
    marginHorizontal: 16,
  },
  textSearchSub: {
    fontSize: 14,
    color: colors.textPrimary,
    fontFamily: fonts.SofiaProBold,
    marginHorizontal: 16,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignSelf: 'center',
  },
});
