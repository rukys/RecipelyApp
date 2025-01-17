/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {useDebounce} from 'use-debounce';
import tw from '../../../tailwind';
import {ImgFoody} from '../../assets';
import {
  Button,
  CardFavorite,
  CardSearch,
  Gap,
  Header,
  InputSearch,
} from '../../components';
import useFavorite from '../../hooks/use-favorite';
import {globalStore} from '../../stores';
import {useForm} from '../../utils';

export default function FavoriteScreen({navigation}) {
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
      <View style={tw.style('flex-1 bg-white')}>
        <Header title="Resep Favorit" isHideLeft />
        <Gap height={8} />

        {listFavorite.length === 0 ? (
          <ScrollView
            style={tw.style('flex-1 mx-8')}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefreshScreen}
              />
            }>
            <Gap height={24} />
            <View style={tw.style('self-center')}>
              <ImgFoody width={225} />
            </View>
            {/* <Gap height={16} /> */}
            <Text
              style={tw.style(
                'font-sofia text-textPrimary text-center text-lg mx-4',
              )}>
              Temukan Resep Favorit Anda
            </Text>
            <Gap height={8} />
            <Text
              style={tw.style(
                'font-sofiaLight text-textGrey text-center text-md',
              )}>
              Anda belum menandai resep apapun sebagai favorit. Temukan
              resep-resep lezat dan simpan untuk akses mudah di sini
            </Text>
            <Gap height={24} />
            <Button
              title="Temukan Resep"
              style={tw.style('p-2')}
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
                <Text
                  style={tw.style(
                    'text-md text-textGrey font-sofia ml-5 mx-4',
                  )}>
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
                  refreshControl={
                    <RefreshControl
                      refreshing={isLoading}
                      onRefresh={onRefreshScreen}
                    />
                  }>
                  <Gap height={8} />
                  <View style={tw.style('flex-row flex-wrap')}>
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
