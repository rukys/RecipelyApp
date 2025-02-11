/* eslint-disable react-hooks/exhaustive-deps */
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';
import React, {useEffect, useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import {
  Button,
  ButtonSwitch,
  Gap,
  HeaderNavBar,
  HeaderTopNavBar,
  Shimmer,
} from '../../components';
import useFavorite from '../../hooks/use-favorite';
import useRecipeDetail from '../../hooks/use-recipe-detail';
import {globalStore, themeStore} from '../../stores';

export default function RecipeDetailScreen({route}) {
  const {key, thumb, calories} = route.params || {};

  const [expand, setExpand] = useState(false);
  const [isIngredient, setIsIngredient] = useState(false);

  const visible = globalStore(state => state.visible);
  const setVisible = globalStore(state => state.setVisible);

  const isDarkMode = themeStore(state => state.isDarkMode);

  const {resultRecipeDetail, isLoadingRecipeDetail} = useRecipeDetail(key);
  const {
    onStoreDatabase,
    onCheckStoreDatabase,
    onDeleteStoreDatabase,
    isStore,
  } = useFavorite();

  const getDataIngredient = resultRecipeDetail?.ingredient || [];
  const getDataInstructions = resultRecipeDetail?.step || [];
  const getDataSubContent = !isIngredient
    ? getDataIngredient
    : getDataInstructions;

  const onChangeSwitch = () => {
    setIsIngredient(!isIngredient);
  };

  const onChangeFavorite = data => {
    const store = {
      key: key,
      ...data,
      thumb: thumb,
    };
    onStoreDatabase(store);
  };

  const onDeleteFavorite = () => {
    onDeleteStoreDatabase(key);
  };

  useEffect(() => {
    onCheckStoreDatabase(key);
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <AnimatedScrollView
        HeaderNavbarComponent={
          <HeaderNavBar
            isStore={isStore}
            setVisible={() => {
              setVisible(true);
            }}
            onChangeFavorite={() => {
              onChangeFavorite(resultRecipeDetail);
            }}
          />
        }
        TopNavBarComponent={
          <HeaderTopNavBar
            title={resultRecipeDetail?.title || ''}
            isDarkMode={isDarkMode}
          />
        }
        topBarHeight={75}
        headerImage={{
          uri: resultRecipeDetail?.thumb ? resultRecipeDetail?.thumb : thumb,
        }}>
        <View
          style={tw.style(
            '-mt-4 rounded-t-2xl p-5 pt-4',
            isDarkMode ? 'bg-black' : 'bg-white',
          )}>
          <View style={tw.style('self-center')}>
            <View style={tw.style('w-14 h-1.5 rounded-full bg-grey')} />
          </View>
          <Gap height={16} />

          {/* Component Title */}
          {isLoadingRecipeDetail ? (
            <>
              <Shimmer style={tw.style('h-4 rounded')} />
              <Gap height={8} />
              <Shimmer style={tw.style('w-3/4 h-4 rounded')} />
            </>
          ) : (
            <View>
              <Text
                style={tw.style(
                  'font-sofiaBold text-base',
                  isDarkMode ? ' text-white' : 'text-textPrimary',
                )}>
                {resultRecipeDetail?.title}
              </Text>
            </View>
          )}
          <Gap height={8} />

          {/* Component Description */}
          {isLoadingRecipeDetail ? (
            <>
              <Gap height={8} />
              <Shimmer style={tw.style('h-3 rounded')} />
              <Gap height={5} />
              <Shimmer style={tw.style('h-3 rounded')} />
              <Gap height={5} />
              <Shimmer style={tw.style('h-3 rounded w-3/4')} />
            </>
          ) : (
            <View>
              <Text
                style={tw.style(
                  'font-sofia',
                  isDarkMode ? ' text-white' : 'text-textGrey',
                )}
                numberOfLines={expand ? 300 : 3}>
                {resultRecipeDetail?.desc}
              </Text>
              <TouchableOpacity onPress={() => setExpand(!expand)}>
                <Text
                  style={tw.style(
                    'font-sofia',
                    isDarkMode ? 'text-white' : 'text-textPrimary',
                  )}>
                  {expand ? 'Sembunyikan' : 'Lihat selengkapnya'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Gap height={16} />

          {/* Component Icon Calories, Dificulty and Times */}
          <View style={tw.style('flex-row')}>
            {isLoadingRecipeDetail ? (
              <>
                <Shimmer
                  style={tw.style(
                    'h-9 w-9 rounded-lg justify-center items-center bg-grey',
                  )}
                />
                <Gap width={8} />
                <Shimmer style={tw.style('h-4 w-1/5 self-center rounded')} />
                <Gap width={8} />
                <Shimmer
                  style={tw.style(
                    'h-9 w-9 rounded-lg justify-center items-center bg-grey',
                  )}
                />
                <Gap width={8} />
                <Shimmer style={tw.style('h-4 w-1/5 self-center rounded')} />
                <Gap width={8} />
                <Shimmer
                  style={tw.style(
                    'h-9 w-9 rounded-lg justify-center items-center bg-grey',
                  )}
                />
                <Gap width={8} />
                <Shimmer style={tw.style('h-4 w-1/5 self-center rounded')} />
              </>
            ) : (
              <>
                {resultRecipeDetail?.calories || calories ? (
                  <>
                    <View
                      style={tw.style(
                        'h-9 w-9 rounded-lg justify-center items-center bg-grey',
                      )}>
                      <FontAwesomeIcon
                        name={'fire'}
                        size={20}
                        color={tw.color('textGrey')}
                      />
                    </View>
                    <Gap width={8} />
                    <Text
                      style={tw.style(
                        'font-sofia self-center',
                        isDarkMode ? 'text-white' : 'text-textGrey',
                      )}>
                      {resultRecipeDetail?.calories || calories}
                    </Text>
                    <Gap width={16} />
                  </>
                ) : null}
                <View
                  style={tw.style(
                    'h-9 w-9 rounded-lg justify-center items-center bg-grey',
                  )}>
                  <FontAwesomeIcon
                    name={'bolt'}
                    size={20}
                    color={tw.color('textGrey')}
                  />
                </View>
                <Gap width={8} />
                <Text
                  style={tw.style(
                    'font-sofia self-center',
                    isDarkMode ? 'text-white' : 'text-textGrey',
                  )}>
                  {resultRecipeDetail?.difficulty}
                </Text>
                <Gap width={16} />
                <View
                  style={tw.style(
                    'h-9 w-9 rounded-lg justify-center items-center bg-grey',
                  )}>
                  <FontAwesomeIcon
                    name={'clock'}
                    size={20}
                    color={tw.color('textGrey')}
                  />
                </View>
                <Gap width={8} />
                <Text
                  style={tw.style(
                    'font-sofia self-center',
                    isDarkMode ? 'text-white' : 'text-textGrey',
                  )}>
                  {resultRecipeDetail?.times}
                </Text>
              </>
            )}
          </View>
          <Gap height={24} />

          {/* Component Button Switch */}
          {isLoadingRecipeDetail ? (
            <Shimmer style={tw.style('h-14 rounded-xl')} />
          ) : (
            <ButtonSwitch
              titleLeft="Komposisi"
              titleRight="Panduan"
              isDarkMode={isDarkMode}
              onPress={onChangeSwitch}
            />
          )}
          <Gap height={16} />

          {/* Component title Ingredients and Instructions */}
          {isLoadingRecipeDetail ? (
            <Shimmer style={tw.style('h-4 rounded w-1/3')} />
          ) : (
            <View style={tw.style('flex-row')}>
              <Text
                style={tw.style(
                  'flex-1 text-base font-sofiaBold',
                  isDarkMode ? 'text-white' : 'text-textPrimary',
                )}>
                {isIngredient ? 'Pandaun :' : 'Komposisi :'}
              </Text>
            </View>
          )}
          <Gap height={8} />

          {/* Component content Ingredients and Instructions */}

          {isLoadingRecipeDetail ? (
            <>
              <Gap height={8} />
              <Shimmer style={tw.style('h-3 rounded w-3/4')} />
              <Gap height={8} />
              <Shimmer style={tw.style('h-3 rounded w-3/5')} />
              <Gap height={16} />
              <Shimmer style={tw.style('h-3 rounded w-3/4')} />
              <Gap height={8} />
              <Shimmer style={tw.style('h-3 rounded w-3/5')} />
              <Gap height={16} />
              <Shimmer style={tw.style('h-3 rounded w-3/4')} />
              <Gap height={8} />
              <Shimmer style={tw.style('h-3 rounded w-3/5')} />
              <Gap height={16} />
              <Shimmer style={tw.style('h-3 rounded w-3/4')} />
              <Gap height={8} />
              <Shimmer style={tw.style('h-3 rounded w-3/5')} />
              <Gap height={16} />
              <Shimmer style={tw.style('h-3 rounded w-3/4')} />
              <Gap height={8} />
              <Shimmer style={tw.style('h-3 rounded w-3/5')} />
            </>
          ) : (
            getDataSubContent.map((item, index) => {
              return (
                <View style={tw.style('flex-row')} key={index}>
                  {!isIngredient ? (
                    <Text
                      style={tw.style(
                        'font-sofia',
                        isDarkMode ? 'text-white' : 'text-textGrey',
                      )}>
                      -{' '}
                    </Text>
                  ) : null}
                  <Text
                    style={tw.style(
                      'font-sofia',
                      isDarkMode ? 'text-white' : 'text-textGrey',
                    )}>
                    {item.trim()}
                  </Text>
                </View>
              );
            })
          )}
          <Gap height={16} />
        </View>
      </AnimatedScrollView>

      <ReactNativeModal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}>
        <View style={tw.style('p-4 bg-white rounded-lg')}>
          <Text style={tw.style('font-sofiaBold text-base text-textPrimary')}>
            Konfirmasi Hapus
          </Text>
          <Gap height={5} />
          <Text style={tw.style('font-sofia text-textPrimary')}>
            Apakah Anda yakin ingin menghapus resep ini?
          </Text>
          <Gap height={36} />
          <View style={tw.style('flex-row')}>
            <Button
              style={tw.style('flex-1 bg-white text-textPrimary border')}
              textStyle={tw.style('font-sofiaBold text-textPrimary')}
              type="text"
              title="Tidak"
              onPress={() => setVisible(false)}
            />
            <Gap width={16} />
            <Button
              style={tw.style('flex-1')}
              title="Hapus"
              onPress={() => {
                setVisible(false);
                onDeleteFavorite();
              }}
            />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
}
