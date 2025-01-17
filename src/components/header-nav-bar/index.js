import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from '../../../tailwind';
import {IconArrowLeft, IconDelete, IconHeartMini} from '../../assets';

const HeaderNavBar = ({
  isStore,
  setVisible = () => {},
  onChangeFavorite = () => {},
}) => {
  const navigation = useNavigation();
  return (
    <View style={tw.style('flex-row w-full justify-between items-center mb-4')}>
      <TouchableOpacity
        style={tw.style(
          'h-9 w-9 ml-4 mt-8 justify-center items-center bg-white rounded-lg',
        )}
        onPress={() => {
          navigation.goBack();
        }}>
        <IconArrowLeft />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          'h-9 w-9 mr-4 mt-8 justify-center items-center bg-white rounded-lg',
        )}
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
