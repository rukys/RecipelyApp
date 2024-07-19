import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconArrowLeft, IconDelete, IconHeartMini} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils';

const HeaderNavBar = ({
  isStore,
  setVisible = () => {},
  onChangeFavorite = () => {},
}) => {
  const navigation = useNavigation();
  return (
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
            setVisible();
          } else {
            onChangeFavorite();
          }
        }}>
        {isStore ? <IconDelete /> : <IconHeartMini />}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderNavBar;

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
});
