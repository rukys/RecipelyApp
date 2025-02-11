import {useNavigation} from '@react-navigation/native';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import {TouchableOpacity, View} from 'react-native';
import tw from '../../../tailwind';

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
        <FontAwesomeIcon
          name={'arrow-left'}
          size={18}
          color={tw.color('textPrimary')}
        />
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
        <FontAwesomeIcon
          name={isStore ? 'trash-can' : 'heart'}
          size={18}
          color={tw.color('textPrimary')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderNavBar;
