import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import Gap from '../gap';

const HeaderTopNavBar = ({title}) => {
  return (
    <View style={styles.container}>
      <Gap width={5} />
      <Text style={styles.texttitle}>{title}</Text>
    </View>
  );
};

export default HeaderTopNavBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  texttitle: {
    flex: 1,
    fontFamily: fonts.SofiaProBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
});
