import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import tw from '../../../tailwind';
import {CardSearch, Gap, Header} from '../../components';
import useNewRecipes from '../../hooks/use-newrecipe';
import useRecipeByCategory from '../../hooks/use-recipe-by-category';
import {globalStore, themeStore} from '../../stores';
import ShimmerRecipe from './shimmer/shimmer-recipe';

export default function RecipeScreen({route, navigation}) {
  const {title, category = ''} = route.params || {};

  const valCategory = category.replace(/-/g, ' ');
  const upperFirstCapital = valCategory
    .toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

  const setLoading = globalStore(state => state.setLoading);
  const isLoading = globalStore(state => state.loading);

  const isDarkMode = themeStore(state => state.isDarkMode);

  const {resultNewRecipes, isLoadingNewRecipes, onRefetchNewRecipes} =
    useNewRecipes();
  const {
    resultRecipeByCategory,
    onRefetchRecipeByCategory,
    isLoadingRecipeByCategory,
  } = useRecipeByCategory(category);

  const resultData =
    title === 'NewRecipe' ? resultNewRecipes : resultRecipeByCategory;
  const isLoadingAll =
    title === 'NewRecipe'
      ? isLoadingNewRecipes || isLoading
      : isLoadingRecipeByCategory || isLoading;

  const onNavigateDetail = data => {
    navigation.navigate('RecipeDetailScreen', data);
  };

  const onRefreshScreen = () => {
    setLoading(true);
    setTimeout(() => {
      if (title === 'NewRecipe') {
        onRefetchNewRecipes();
      } else {
        onRefetchRecipeByCategory();
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <View style={tw.style('flex-1', isDarkMode ? 'bg-black' : 'bg-white')}>
        <Header
          onPressBack={() => navigation.goBack()}
          isWhite={isDarkMode}
          title={
            title === 'NewRecipe'
              ? 'Resep Terbaru'
              : 'Kategori ' + upperFirstCapital
          }
        />
        <Gap height={8} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefreshScreen}
            />
          }>
          {isLoadingAll
            ? [1, 2, 3, 4, 5].map(key => (
                <>
                  <ShimmerRecipe key={key} />
                  <Gap height={8} />
                </>
              ))
            : resultData.map((item, index) => {
                return (
                  <CardSearch
                    img={item.thumb}
                    title={item.title}
                    time={item.times}
                    difficulty={item.difficulty}
                    isDarkMode={isDarkMode}
                    onPress={() => {
                      onNavigateDetail(item);
                    }}
                    key={index}
                  />
                );
              })}
          <Gap height={24} />
        </ScrollView>
      </View>
    </>
  );
}
