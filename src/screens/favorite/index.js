/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, useForm} from '../../utils';
import {
  Button,
  CardFavorite,
  CardSearch,
  Gap,
  Header,
  InputSearch,
} from '../../components';
import {globalStore} from '../../stores';
import {ImgFoody} from '../../assets';
import useFavorite from '../../hooks/use-favorite';

export default function FavoriteScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useForm({
    keyword: '',
  });
  const [debouncedKeyword] = useDebounce(form?.keyword, 400);

  const [resultSearch, setResultSearch] = useState([]);

  const setLoading = globalStore(state => state.setLoading);
  const isLoading = globalStore(state => state.loading);
  const listFavorite = globalStore(state => state.listFavorite);

  const {getStoreDatabase} = useFavorite();

  const onNavigateHome = () => {
    navigation.navigate('HomeScreen');
  };

  const onNavigateDetail = data => {
    navigation.navigate('RecipeDetailScreen', data);
  };

  const onRefreshScreen = () => {
    setLoading(true);
    setTimeout(() => {
      getStoreDatabase();
      setLoading(false);
    }, 1500);
  };

  const handleSearchClick = () => {
    if (form?.keyword === '') {
      setResultSearch(listFavorite);
      return;
    }
    const filterBySearch = listFavorite.filter(item => {
      if (item?.title.toLowerCase().includes(debouncedKeyword.toLowerCase())) {
        return item;
      }
    });

    setResultSearch(filterBySearch);
  };

  useEffect(() => {
    getStoreDatabase();
  }, []);

  return (
    <>
      <View style={styles.page}>
        <Header title="Resep Favorit" isHideLeft />
        <Gap height={8} />

        {listFavorite.length === 0 ? (
          <ScrollView
            style={styles.containerEmpty}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefreshScreen}
              />
            }>
            <Gap height={24} />
            <View style={styles.center}>
              <ImgFoody width={225} />
            </View>
            {/* <Gap height={16} /> */}
            <Text style={styles.textEmpty}>Temukan Resep Favorit Anda</Text>
            <Gap height={8} />
            <Text style={styles.textEmptySub}>
              Anda belum menandai resep apapun sebagai favorit. Temukan
              resep-resep lezat dan simpan untuk akses mudah di sini
            </Text>
            <Gap height={24} />
            <Button
              title="Temukan Resep"
              style={styles.button}
              onPress={onNavigateHome}
            />
          </ScrollView>
        ) : (
          <>
            <InputSearch
              placeholder="Cari resep favorit"
              value={form?.keyowrd}
              onBlur={handleSearchClick}
              onChangeText={value => {
                setForm('keyword', value);
              }}
            />
            <Gap height={16} />
            {debouncedKeyword !== '' ? (
              <View>
                <Text style={styles.textSearch}>
                  Hasil pencarian untuk{' '}
                  <Text style={styles.textSearchSub}>"{debouncedKeyword}"</Text>
                </Text>
                <Gap height={4} />
                <ScrollView style={styles.contentSearch}>
                  {resultSearch.map((item, index) => {
                    return (
                      <CardSearch
                        key={index}
                        img={item.thumb}
                        title={item.title}
                        difficulty={item.difficulty}
                        time={item.times}
                        onPress={() => {
                          onNavigateDetail(item);
                        }}
                      />
                    );
                  })}
                  <Gap height={24} />
                </ScrollView>
              </View>
            ) : (
              <>
                <ScrollView
                  style={styles.scroll}
                  refreshControl={
                    <RefreshControl
                      refreshing={isLoading}
                      onRefresh={onRefreshScreen}
                    />
                  }>
                  <Gap height={8} />
                  <View style={styles.content}>
                    {listFavorite.map((item, index) => {
                      return (
                        <CardFavorite
                          key={index}
                          img={item.thumb}
                          title={item.title}
                          difficulty={item.difficulty}
                          time={item.times}
                          onPress={() => {
                            onNavigateDetail(item);
                          }}
                        />
                      );
                    })}
                  </View>
                  <Gap height={24} />
                </ScrollView>
              </>
            )}
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
  scroll: {},
  content: {
    // width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerEmpty: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginHorizontal: 32,
  },
  textEmpty: {
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 16,
  },
  textEmptySub: {
    fontFamily: fonts.SofiaProLight,
    color: colors.textGrey,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    paddingHorizontal: 16,
  },
  center: {
    alignSelf: 'center',
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
});
