import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import tw from '../../../tailwind';
import {IconChef} from '../../assets';
import {themeStore} from '../../stores';

export default function SplashScreen({navigation}) {
  const isDarkMode = themeStore(state => state.isDarkMode);
  // Generate unique token represents each devices
  const generateFCMToken = uid => {
    messaging()
      .getToken()
      .then(token => {
        if (uid && token) {
          database()
            .ref('/users/' + uid)
            .update({
              fcmToken: token,
            })
            .then(() => console.log('Data updated generate FCM token'));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          generateFCMToken(user?.uid);
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
      <StatusBar
        backgroundColor={tw.color(isDarkMode ? 'black' : 'primary')}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <View
        style={tw.style(
          'flex-1 items-center justify-center p-8',
          isDarkMode ? 'bg-black' : 'bg-primary',
        )}>
        <IconChef width={125} height={125} />
        <Text style={tw.style('text-white text-2xl font-sofiaExtraLight')}>
          Recipely
        </Text>
      </View>
    </>
  );
}
