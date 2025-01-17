import {
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import deviceInfoModule from 'react-native-device-info';
import {
  ButtonCategory,
  CardArticle,
  CardNewRecipe,
  CardRecipe,
  Gap,
} from '../../components';
import {
  // IconNotif,
  IconSun,
} from '../../assets';
import {globalStore, userStore} from '../../stores';
import useNewRecipes from '../../hooks/use-newrecipe';
import useRecipeCategory from '../../hooks/use-recipe-category';
import useRecipeByCategory from '../../hooks/use-recipe-by-category';
import useNewArticle from '../../hooks/use-newarticle';
import useFavorite from '../../hooks/use-favorite';
import ShimmerNewRecipe from './shimmer/shimmer-new-recipe';
import ShimmerCategory from './shimmer/shimmer-category';
import ShimmerRecipeByCategory from './shimmer/shimmer-recipe-by-category';
import ShimmerArticle from './shimmer/shimmer-article';
import tw from '../../../tailwind';

export default function HomeScreen({navigation}) {
  const getUser = userStore(state => state.user);

  const setLoading = globalStore(state => state.setLoading);
  const isLoading = globalStore(state => state.loading);

  const [indexCategory, setIndexCategory] = useState(0);
  const [valueCategory, setValueCategory] = useState('sarapan');

  const {resultNewRecipes, isLoadingNewRecipes, onRefetchNewRecipes} =
    useNewRecipes();
  const {
    resultRecipeCategory,
    isLoadingRecipeCategory,
    onRefetchRecipeCategory,
  } = useRecipeCategory();
  const {
    resultRecipeByCategory,
    onRefetchRecipeByCategory,
    isLoadingRecipeByCategory,
  } = useRecipeByCategory(valueCategory);
  const {resultNewArticle, isLoadingNewArticle, onRefetchNewArticle} =
    useNewArticle();
  const {onStoreDatabase} = useFavorite();

  const onChangeRecipeCategory = (index, category) => {
    setIndexCategory(index);
    setValueCategory(category);
    onRefetchRecipeByCategory();
  };

  const onChangeFavorite = data => {
    onStoreDatabase(data);
  };

  const onNavigateRecipe = title => {
    const params = {
      title: title,
      category: title ? valueCategory : '',
    };
    navigation.navigate('RecipeScreen', params);
  };

  const onNavigateDetail = data => {
    navigation.navigate('RecipeDetailScreen', data);
  };

  const onNavigateArticleDetail = data => {
    navigation.navigate('ArticleDetailScreen', data);
  };

  // const onNavigateNotif = () => {};

  const onRefreshScreen = () => {
    setLoading(true);
    setTimeout(() => {
      onRefetchNewRecipes();
      onRefetchRecipeCategory();
      onRefetchRecipeByCategory();
      onRefetchNewArticle();
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar backgroundColor={tw.color('white')} barStyle="dark-content" />
      <Gap height={16} />
      <View style={tw.style('flex-row mx-4 bg-white h-14')}>
        <View style={tw.style('flex-1')}>
          <View style={tw.style('flex-row')}>
            <IconSun />
            <Gap width={8} />
            <Text style={tw.style('font-sofia text-textPrimary')}>
              Selamat Datang
            </Text>
          </View>
          <Text style={tw.style('font-sofiaBold text-xl text-textPrimary')}>
            {getUser?.fullName}
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.center} onPress={onNavigateNotif}>
          <IconNotif />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        style={tw.style('flex-1')}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefreshScreen} />
        }>
        <Gap height={19} />
        <View>
          <View style={tw.style('flex-row')}>
            <Text
              style={tw.style(
                'flex-1 ml-4 text-lg text-textPrimary font-sofiaBold',
              )}>
              Resep Terbaru
            </Text>
            <TouchableOpacity
              style={tw.style('self-center')}
              onPress={() => {
                onNavigateRecipe('NewRecipe');
              }}>
              <Text
                style={tw.style('text-md text-primary font-sofiaBold mr-4')}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>
          <Gap height={4} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Gap width={16} />
            {isLoadingNewRecipes || isLoading
              ? [1, 2, 3, 4, 5].map(key => (
                  <>
                    <ShimmerNewRecipe key={key} />
                    <Gap width={16} />
                  </>
                ))
              : resultNewRecipes.slice(0, 5).map((item, index) => {
                  return (
                    <CardNewRecipe
                      key={index}
                      img={item?.thumb}
                      title={item.title}
                      time={item.times}
                      difficulty={item.difficulty}
                      calories={item.calories}
                      onPressFav={() => {
                        onChangeFavorite(item);
                      }}
                      onPress={() => {
                        onNavigateDetail(item);
                      }}
                    />
                  );
                })}
          </ScrollView>
        </View>
        <Gap height={16} />
        <View>
          <View style={tw.style('flex-row')}>
            <Text
              style={tw.style(
                'flex-1 ml-4 text-lg text-textPrimary font-sofiaBold',
              )}>
              Kategori
            </Text>
            <TouchableOpacity
              style={tw.style('self-center')}
              onPress={() => onNavigateRecipe('RecipeByCategory')}>
              <Text
                style={tw.style('text-md text-primary font-sofiaBold mr-4')}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>
          <Gap height={12} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Gap width={16} />
            {isLoadingRecipeCategory || isLoading
              ? [1, 2, 3, 4, 5].map(key => (
                  <>
                    <ShimmerCategory key={key} />
                    <Gap width={16} />
                  </>
                ))
              : resultRecipeCategory.slice(0, 5).map((item, index) => {
                  return (
                    <ButtonCategory
                      key={index}
                      title={item.category}
                      id={index}
                      indexButton={indexCategory}
                      onPress={() => onChangeRecipeCategory(index, item?.key)}
                    />
                  );
                })}
          </ScrollView>
        </View>
        <Gap height={12} />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Gap width={16} />
            {isLoadingRecipeByCategory || isLoading
              ? [1, 2, 3, 4, 5].map(key => (
                  <>
                    <ShimmerRecipeByCategory key={key} />
                    <Gap width={16} />
                  </>
                ))
              : resultRecipeByCategory.slice(0, 5).map((item, index) => {
                  return (
                    <CardRecipe
                      key={index}
                      img={item.thumb}
                      title={item.title}
                      time={item.times}
                      calories={item.calories}
                      difficulty={item.difficulty}
                      onPress={() => {
                        onNavigateDetail(item);
                      }}
                      onPressFav={() => {
                        onChangeFavorite(item);
                      }}
                    />
                  );
                })}
          </ScrollView>
        </View>
        <Gap height={16} />
        <View>
          <View style={tw.style('flex-row')}>
            <Text
              style={tw.style(
                'flex-1 ml-4 text-lg text-textPrimary font-sofiaBold',
              )}>
              Artikel
            </Text>
            <TouchableOpacity
              style={tw.style('self-center')}
              onPress={() => {
                navigation.navigate('ArticleScreen');
              }}>
              <Text
                style={tw.style('text-md text-primary font-sofiaBold mr-4')}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>
          <Gap height={12} />
          <View style={tw.style('mx-4')}>
            {isLoadingNewArticle || isLoading
              ? [1, 2, 3].map(key => (
                  <>
                    <ShimmerArticle key={key} />
                    <Gap height={16} />
                  </>
                ))
              : resultNewArticle.slice(0, 5).map((item, index) => {
                  return (
                    <CardArticle
                      img={item.thumb}
                      title={item.title}
                      key={index}
                      onPress={() => onNavigateArticleDetail(item)}
                    />
                  );
                })}
          </View>
        </View>
        <Gap height={8} />
        <View style={tw.style('items-center')}>
          <Text
            style={tw.style(
              'font-sofiaExtraLight text-xs text-textGrey text-center',
            )}>
            Recipely
          </Text>
          <Text
            style={tw.style(
              'text-xs font-sofiaExtraLight text-textGrey text-center',
            )}>
            version {deviceInfoModule.getVersion()}
          </Text>
        </View>
        <Gap height={16} />
      </ScrollView>
    </View>
  );
}
