/* eslint-disable react-hooks/exhaustive-deps */
import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {
  CardProfileDetail,
  CardProfileList,
  Gap,
  Header,
  ModalConfirm,
} from '../../components';
import {globalStore, userStore} from '../../stores';
import {
  IconChef2,
  IconContactMe,
  // IconContrast,
  IconDanger,
  IconDeleteAccount,
  IconHelp,
  // IconLanguage,
  IconLogout,
  // IconNotif,
  IconProfile,
} from '../../assets';
import useRemoteSetting from '../../hooks/use-remote-setting';
import tw from '../../../tailwind';

export default function ProfileScreen({navigation}) {
  // const [isSwitch, setIsSwitch] = useState(false);
  const [photo, setPhoto] = useState(false);
  // const [language, setLanguage] = useState('id');

  // const isDarkMode = themeStore(state => state.isDarkMode);
  // const setIsDarkMode = themeStore(state => state.setIsDarkMode);

  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const visible = globalStore(state => state.visible);
  const setVisible = globalStore(state => state.setVisible);
  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const {remoteSetting} = useRemoteSetting();

  const onNavigateListMenu = screenName => {
    navigation.navigate(screenName);
  };

  const onNavigateWebview = (valUrl, title) => {
    navigation.navigate('WebviewScreen', {url: valUrl, titleHeader: title});
  };

  const onSubmitLogout = () => {
    setVisible(true);
  };

  const getDataFromDatabase = () => {
    database()
      .ref('/users/' + getUser.uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const getData = snapshot.val();
          setPhoto(getData?.photo);
          // setIsSwitch(getData?.isNotif);
        }
      });
  };

  // const onChangeRuleNotification = () => {
  //   const newRule = !isSwitch;
  //   database()
  //     .ref('/users/' + getUser.uid)
  //     .update({
  //       isNotif: newRule,
  //     })
  //     .then(() => {
  //       setIsSwitch(newRule);
  //       showMessage(
  //         newRule
  //           ? 'Notifkasi berhasil di bunyikan'
  //           : 'Notifkasi berhasil di senyapkan',
  //         'success',
  //       );
  //     });
  // };

  const onChangeLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      auth()
        .signOut()
        .then(() => {
          setVisible(false);
          setIsLoading(false);
          setUser({});
          navigation.reset({
            index: 0,
            routes: [{name: 'OnboardScreen'}],
          });
        });
    }, 1500);
  };

  useEffect(() => {
    getDataFromDatabase();

    return () => getDataFromDatabase();
  }, []);

  return (
    <>
      <View style={tw.style('flex-1 bg-white px-4')}>
        <Header title="Profil" isHideLeft />
        <Gap height={8} />
        <CardProfileDetail
          fullName={getUser?.fullName}
          email={getUser?.email}
          img={photo}
          onPress={() => onNavigateListMenu('ProfileDetailScreen')}
        />
        <Gap height={24} />
        {/* <CardProfileList
          onPress={() => {
            onChangeRuleNotification();
          }}
          title="Notifikasi"
          icon={<IconNotif />}
          iconRight={
            <Switch
              trackColor={isSwitch ? colors.textPrimary : colors.grey}
              thumbColor={isSwitch ? colors.textPrimary : colors.white}
              value={isSwitch}
              onValueChange={() => {
                onChangeRuleNotification();
              }}
            />
          }
        /> */}
        {/* <CardProfileList title="Ganti Bahasa" icon={<IconLanguage />} /> */}
        <CardProfileList
          title="Ubah Profil"
          icon={<IconProfile />}
          onPress={() => onNavigateListMenu('ProfileDetailScreen')}
        />
        {/* <CardProfileList
          onPress={() => {
            setIsDarkMode(!isDarkMode);
          }}
          title={isDarkMode ? 'Mode Gelap' : 'Mode Terang'}
          icon={<IconContrast />}
          iconRight={
            <Switch
              trackColor={
                isDarkMode ? tw.color('textPrimary') : tw.color('grey')
              }
              thumbColor={
                isDarkMode ? tw.color('textPrimary') : tw.color('white')
              }
              value={isDarkMode}
              onValueChange={() => {
                setIsDarkMode(!isDarkMode);
              }}
            />
          }
        /> */}
        <CardProfileList
          title="Tentang Aplikasi"
          icon={<IconChef2 />}
          onPress={() => onNavigateListMenu('AboutScreen')}
        />
        <CardProfileList
          title="F.A.Q"
          icon={<IconHelp />}
          onPress={() => onNavigateListMenu('FaqScreen')}
        />
        <CardProfileList
          title="Hubungi Kami"
          icon={<IconContactMe />}
          onPress={() => onNavigateListMenu('ContactMeScreen')}
        />
        <CardProfileList
          title="Kebijakan dan Privasi"
          icon={<IconDanger />}
          onPress={() => {
            onNavigateWebview(
              remoteSetting?.url_privacy,
              'Kebijakan dan Privasi',
            );
          }}
        />
        <CardProfileList
          title="Hapus Akun"
          icon={<IconDeleteAccount />}
          onPress={() => onNavigateListMenu('DeleteAccountScreen')}
        />
        <TouchableOpacity
          style={tw.style('h-11 flex-row items-center')}
          onPress={onSubmitLogout}>
          <Gap width={3} />
          <IconLogout />
          <Gap width={13} />
          <Text style={tw.style('font-sofia text-base text-error')}>
            Keluar
          </Text>
        </TouchableOpacity>
      </View>

      <ModalConfirm
        visible={visible}
        isLoading={isLoading}
        buttonTextRight="Ya"
        buttonTextLeft="Tidak"
        titleModal="Konfirmasi Keluar"
        subTitleModal="Apakah Anda yakin ingin keluar aplikasi?"
        onBackdropPress={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onPress={onChangeLogout}
      />
    </>
  );
}
