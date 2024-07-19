import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import deviceInfoModule from 'react-native-device-info';
import {colors, fonts} from '../../utils';
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
    <View style={styles.page}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Gap height={16} />
      <View style={styles.containerHeader}>
        <View style={styles.flex}>
          <View style={styles.row}>
            <IconSun />
            <Gap width={8} />
            <Text style={styles.textWelcome}>Selamat Datang</Text>
          </View>
          <Text style={styles.textFullName}>{getUser?.fullName}</Text>
        </View>
        {/* <TouchableOpacity style={styles.center} onPress={onNavigateNotif}>
          <IconNotif />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefreshScreen} />
        }>
        <Gap height={19} />
        <View style={styles.containerNewRecipe}>
          <View style={styles.row}>
            <Text style={[styles.textTitle, styles.flex]}>Resep Terbaru</Text>
            <TouchableOpacity
              style={styles.center}
              onPress={() => {
                onNavigateRecipe('NewRecipe');
              }}>
              <Text style={styles.textSeeAll}>Lihat Semua</Text>
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
        <View style={styles.containerCategory}>
          <View style={styles.row}>
            <Text style={[styles.textTitle, styles.flex]}>Kategori</Text>
            <TouchableOpacity
              style={styles.center}
              onPress={() => onNavigateRecipe('RecipeByCategory')}>
              <Text style={styles.textSeeAll}>Lihat Semua</Text>
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
        <View style={styles.containerRecipe}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollRecipe}>
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
        <View style={styles.containerArticle}>
          <View style={styles.row}>
            <Text style={[styles.textTitle, styles.flex]}>Artikel</Text>
            <TouchableOpacity
              style={styles.center}
              onPress={() => {
                navigation.navigate('ArticleScreen');
              }}>
              <Text style={styles.textSeeAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <Gap height={12} />
          <View style={styles.contentArticle}>
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
        <View style={styles.center}>
          <Text style={styles.textNameApp}>Recipely</Text>
          <Text style={styles.textVersionApp}>
            version {deviceInfoModule.getVersion()}
          </Text>
        </View>
        <Gap height={16} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerHeader: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: colors.white,
    height: 60,
  },
  textWelcome: {
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
  },
  textFullName: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 24,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  containerNewRecipe: {},
  containerCategory: {},
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
  containerRecipe: {},
  scrollRecipe: {},
  contentArticle: {
    marginHorizontal: 16,
  },
  textNameApp: {
    fontFamily: fonts.SofiaProExtraLight,
    fontSize: 12,
    color: colors.textGrey,
    textAlign: 'center',
  },
  textVersionApp: {
    fontSize: 10,
    fontFamily: fonts.SofiaProExtraLight,
    color: colors.textGrey,
    textAlign: 'center',
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
