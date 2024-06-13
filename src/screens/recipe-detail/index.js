/* eslint-disable react-hooks/exhaustive-deps */
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {
  IconArrowLeft,
  IconBolt,
  IconCalories,
  IconDelete,
  IconHeartMini,
  IconRectangle,
  IconTimeCircle,
} from '../../assets';
import {Button, ButtonSwitch, Gap, Shimmer} from '../../components';
import useRecipeDetail from '../../hooks/use-recipe-detail';
import useFavorite from '../../hooks/use-favorite';
import {colors, fonts} from '../../utils';
import {globalStore} from '../../stores';

export default function RecipeDetailScreen({route}) {
  const navigation = useNavigation();
  const {key, thumb} = route.params || {};

  const [expand, setExpand] = useState(false);
  const [isIngredient, setIsIngredient] = useState(false);

  const visible = globalStore(state => state.visible);
  const setVisible = globalStore(state => state.setVisible);

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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <View style={styles.page}>
        <ScrollView>
          {/* Component Image */}
          {isLoadingRecipeDetail ? (
            <Shimmer style={styles.shimmerImage} />
          ) : (
            <FastImage
              source={{
                uri: resultRecipeDetail?.thumb
                  ? resultRecipeDetail?.thumb
                  : thumb,
              }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}

          {/* Component Button Back and Favorit */}
          <View style={styles.containerHeader}>
            <TouchableOpacity
              style={styles.containerBack}
              onPress={() => {
                navigation.goBack();
              }}>
              <IconArrowLeft />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerFav}
              onPress={() => {
                if (isStore) {
                  setVisible(true);
                } else {
                  onChangeFavorite(resultRecipeDetail);
                }
              }}>
              {isStore ? <IconDelete /> : <IconHeartMini />}
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.containerRectangle}>
              <IconRectangle />
            </View>
            <Gap height={16} />

            {/* Component Title */}
            {isLoadingRecipeDetail ? (
              <>
                <Shimmer style={styles.shimmerTitle} />
                <Gap height={8} />
                <Shimmer style={styles.shimmerTitle1} />
              </>
            ) : (
              <View style={styles.containerTitle}>
                <Text style={styles.texttitle}>
                  {resultRecipeDetail?.title}
                </Text>
              </View>
            )}
            <Gap height={8} />

            {/* Component Description */}
            {isLoadingRecipeDetail ? (
              <>
                <Gap height={8} />
                <Shimmer style={styles.shimmerDesc} />
                <Gap height={5} />
                <Shimmer style={styles.shimmerDesc} />
                <Gap height={5} />
                <Shimmer style={styles.shimmerDesc1} />
              </>
            ) : (
              <View style={styles.containerDesc}>
                <Text style={styles.textDesc} numberOfLines={expand ? 300 : 3}>
                  {resultRecipeDetail?.desc}
                </Text>
                <TouchableOpacity
                  style={styles.containerExpand}
                  onPress={() => setExpand(!expand)}>
                  <Text style={styles.textExpand}>
                    {expand ? 'Sembunyikan' : 'Lihat selengkapnya'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <Gap height={16} />

            {/* Component Icon Calories, Dificulty and Times */}
            <View style={styles.row}>
              {isLoadingRecipeDetail ? (
                <>
                  <Shimmer style={styles.containerBox} />
                  <Gap width={8} />
                  <Shimmer style={styles.shimmerDiff} />
                  <Gap width={8} />
                  <Shimmer style={styles.containerBox} />
                  <Gap width={8} />
                  <Shimmer style={styles.shimmerDiff} />
                  <Gap width={8} />
                  <Shimmer style={styles.containerBox} />
                  <Gap width={8} />
                  <Shimmer style={styles.shimmerDiff} />
                </>
              ) : (
                <>
                  {resultRecipeDetail?.calories && (
                    <>
                      <View style={styles.containerBox}>
                        <IconCalories height={24} width={24} />
                      </View>
                      <Gap width={8} />
                      <Text style={styles.textSub}>
                        {resultRecipeDetail?.calories}
                      </Text>
                      <Gap width={16} />
                    </>
                  )}
                  <View style={styles.containerBox}>
                    <IconBolt height={24} width={24} />
                  </View>
                  <Gap width={8} />
                  <Text style={styles.textSub}>
                    {resultRecipeDetail?.difficulty}
                  </Text>
                  <Gap width={16} />
                  <View style={styles.containerBox}>
                    <IconTimeCircle height={24} width={24} />
                  </View>
                  <Gap width={8} />
                  <Text style={styles.textSub}>
                    {resultRecipeDetail?.times}
                  </Text>
                </>
              )}
            </View>
            <Gap height={24} />

            {/* Component Button Switch */}
            {isLoadingRecipeDetail ? (
              <Shimmer style={styles.shimmerSwitch} />
            ) : (
              <ButtonSwitch
                titleLeft="Komposisi"
                titleRight="Panduan"
                onPress={onChangeSwitch}
              />
            )}
            <Gap height={16} />

            {/* Component title Ingredients and Instructions */}
            {isLoadingRecipeDetail ? (
              <Shimmer style={styles.shimmerIng} />
            ) : (
              <View style={styles.row}>
                <Text style={[styles.textTitle1, styles.flex]}>
                  {isIngredient ? 'Pandaun :' : 'Komposisi :'}
                </Text>
              </View>
            )}
            <Gap height={8} />

            {/* Component content Ingredients and Instructions */}
            <ScrollView style={styles.containerSubContent}>
              {isLoadingRecipeDetail ? (
                <>
                  <Gap height={8} />
                  <Shimmer style={styles.shimmerSubIng} />
                  <Gap height={8} />
                  <Shimmer style={styles.shimmerSubIng1} />
                  <Gap height={16} />
                  <Shimmer style={styles.shimmerSubIng} />
                  <Gap height={8} />
                  <Shimmer style={styles.shimmerSubIng1} />
                  <Gap height={16} />
                  <Shimmer style={styles.shimmerSubIng} />
                  <Gap height={8} />
                  <Shimmer style={styles.shimmerSubIng1} />
                  <Gap height={16} />
                  <Shimmer style={styles.shimmerSubIng} />
                  <Gap height={8} />
                  <Shimmer style={styles.shimmerSubIng1} />
                  <Gap height={16} />
                  <Shimmer style={styles.shimmerSubIng} />
                  <Gap height={8} />
                  <Shimmer style={styles.shimmerSubIng1} />
                </>
              ) : (
                getDataSubContent.map((item, index) => {
                  return (
                    <View style={[styles.row]} key={index}>
                      {!isIngredient ? (
                        <Text style={styles.textSubContent}>- </Text>
                      ) : null}
                      <Text style={styles.textSubContent}>{item.trim()}</Text>
                    </View>
                  );
                })
              )}
              <Gap height={16} />
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      <ReactNativeModal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}>
        <View style={styles.containerModal}>
          <Text style={styles.titleModal}>Konfirmasi Hapus</Text>
          <Gap height={5} />
          <Text style={styles.titlSubeModal}>
            Apakah Anda yakin ingin menghapus resep ini?
          </Text>
          <Gap height={36} />
          <View style={styles.row}>
            <Button
              style={[styles.button, styles.buttonCancel]}
              textStyle={styles.textButtonCancel}
              type="text"
              title="Tidak"
              onPress={() => setVisible(false)}
            />
            <Gap width={16} />
            <Button
              style={styles.button}
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerHeader: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  containerBack: {
    height: 35,
    width: 35,
    marginLeft: 16,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  containerFav: {
    height: 35,
    width: 35,
    marginRight: 16,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  content: {
    // flex: 1,
    backgroundColor: colors.white,
    marginTop: -16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 16,
  },
  containerRectangle: {
    alignSelf: 'center',
  },
  containerTitle: {},
  texttitle: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  containerAuthor: {},
  textAuthor: {
    fontFamily: fonts.SofiaProLight,
    fontSize: 12,
    color: colors.textGrey,
  },
  containerDesc: {
    // flex: 1,
  },
  textDesc: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textGrey,
    // textAlign: 'justify',
  },
  containerExpand: {},
  textExpand: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    // alignSelf: 'center',
    color: colors.textPrimary,
  },
  containerBox: {
    height: 35,
    width: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
  },
  textSub: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    alignSelf: 'center',
    color: colors.textGrey,
  },
  flex: {
    flex: 1,
  },
  center: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetwen: {
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    height: 300,
  },
  textTitle1: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.SofiaProBold,
  },
  containerSubContent: {},
  textSubContent: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textGrey,
  },
  shimmerImage: {
    flex: 1,
    height: 300,
  },
  shimmerTitle: {
    height: 16,
    borderRadius: 5,
  },
  shimmerTitle1: {
    height: 16,
    width: '75%',
    borderRadius: 5,
  },
  shimmerDesc: {
    height: 12,
    borderRadius: 3,
  },
  shimmerDesc1: {
    height: 12,
    width: '75%',
    borderRadius: 3,
  },
  shimmerDiff: {
    height: 16,
    width: '20%',
    alignSelf: 'center',
    borderRadius: 3,
  },
  shimmerSwitch: {
    height: 55,
    borderRadius: 16,
  },
  shimmerIng: {
    height: 16,
    borderRadius: 3,
    width: '30%',
  },
  shimmerSubIng: {
    height: 12,
    borderRadius: 3,
    width: '75%',
  },
  shimmerSubIng1: {
    height: 12,
    borderRadius: 3,
    width: '65%',
  },
  containerModal: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  titleModal: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  titlSubeModal: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textPrimary,
  },
  textButton: {
    color: colors.textPrimary,
  },
  button: {
    flex: 1,
  },
  buttonCancel: {
    backgroundColor: colors.white,
    borderColor: colors.textPrimary,
    borderWidth: 1,
  },
  textButtonCancel: {
    fontFamily: fonts.SofiaProBold,
    color: colors.textPrimary,
    // fontSize: 14,
  },
});
