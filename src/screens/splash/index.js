import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {colors, fonts} from '../../utils';
import {IconChef} from '../../assets';
import {useNavigation} from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{name: 'AppBarScreen'}],
          });
        } else {
          navigation.replace('OnboardScreen');
        }
      }, 2000);
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.page}>
        <IconChef width={125} height={125} />
        <Text style={styles.title}>Recipely</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '300',
    fontFamily: fonts.SofiaProExtraLight,
  },
});
