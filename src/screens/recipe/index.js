import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils';
import {CardSearch, Gap, Header} from '../../components';
import {useNavigation} from '@react-navigation/native';
import useNewRecipes from '../../hooks/use-newrecipe';
import useRecipeByCategory from '../../hooks/use-recipe-by-category';
import ShimmerRecipe from './shimmer/shimmer-recipe';
import {globalStore} from '../../stores';

export default function RecipeScreen({route}) {
  const navigation = useNavigation();
  const {title, category = ''} = route.params || {};

  const valCategory = category.replace(/-/g, ' ');
  const upperFirstCapital = valCategory
    .toLowerCase()
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });

  const setLoading = globalStore(state => state.setLoading);
  const isLoading = globalStore(state => state.loading);

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
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.page}>
        <Header
          onPressBack={() => navigation.goBack()}
          title={
            title === 'NewRecipe'
              ? 'Resep Terbaru'
              : 'Kategori ' + upperFirstCapital
          }
        />
        <Gap height={8} />
        <ScrollView
          style={styles.content}
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {},
});
