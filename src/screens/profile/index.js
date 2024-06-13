/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ReactNativeModal from 'react-native-modal';
import {colors, fonts, showMessage} from '../../utils';
import {
  Button,
  CardProfileDetail,
  CardProfileList,
  Gap,
  Header,
} from '../../components';
import {globalStore, userStore} from '../../stores';
import {
  IconChef2,
  // IconContactMe,
  IconDanger,
  IconHelp,
  // IconLanguage,
  IconLogout,
  IconNotif,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [isSwitch, setIsSwitch] = useState(false);
  // const [language, setLanguage] = useState('id');

  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);
  const visible = globalStore(state => state.visible);
  const setVisible = globalStore(state => state.setVisible);
  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const onNavigateAbout = () => {
    navigation.navigate('AboutScreen');
  };

  const onNavigateFaq = () => {
    navigation.navigate('FaqScreen');
  };

  // const onNavigateContactMe = () => {
  //   navigation.navigate('ContactMeScreen');
  // };

  const onNavigateProfileDetail = () => {
    navigation.navigate('ProfileDetailScreen');
  };

  const onNavigatePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicyScreen');
  };

  const onSubmitLogout = () => {
    setVisible(true);
  };

  const getDataFromDatabase = () => {
    database()
      .ref('/users/' + getUser.uid)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const getData = snapshot.val();
          setIsSwitch(getData?.isNotif);
        }
      });
  };

  const onChangeRuleNotification = () => {
    const newRule = !isSwitch;
    database()
      .ref('/users/' + getUser.uid)
      .update({
        isNotif: newRule,
      })
      .then(() => {
        setIsSwitch(newRule);
        showMessage(
          newRule
            ? 'Notifkasi berhasil di bunyikan'
            : 'Notifkasi berhasil di senyapkan',
          'success',
        );
      });
  };

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
      <View style={styles.page}>
        <Header title="Profil" isHideLeft />
        <Gap height={8} />
        <CardProfileDetail
          fullName={getUser?.fullName}
          email={getUser?.email}
          onPress={onNavigateProfileDetail}
        />
        <Gap height={24} />
        <CardProfileList
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
        />
        {/* <CardProfileList title="Ganti Bahasa" icon={<IconLanguage />} /> */}
        <CardProfileList
          title="Kebijakan dan Privasi"
          icon={<IconDanger />}
          onPress={onNavigatePrivacyPolicy}
        />
        <CardProfileList
          title="F.A.Q"
          icon={<IconHelp />}
          onPress={onNavigateFaq}
        />
        {/* <CardProfileList
          title="Hubungi Kami"
          icon={<IconContactMe />}
          onPress={onNavigateContactMe}
        /> */}
        <CardProfileList
          title="Tentang Aplikasi"
          icon={<IconChef2 />}
          onPress={onNavigateAbout}
        />
        <TouchableOpacity
          style={styles.containerLogout}
          onPress={onSubmitLogout}>
          <Gap width={3} />
          <IconLogout />
          <Gap width={13} />
          <Text style={styles.textLogout}>Keluar</Text>
        </TouchableOpacity>
      </View>

      <ReactNativeModal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}>
        <View style={styles.containerModal}>
          <Text style={styles.titleModal}>Konfirmasi Keluar</Text>
          <Gap height={5} />
          <Text style={styles.titlSubeModal}>
            Apakah Anda yakin ingin keluar?
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
              title="Ya"
              onPress={onChangeLogout}
              isLoading={isLoading}
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
    paddingHorizontal: 16,
  },
  flex: {
    flex: 1,
  },
  containerLogout: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLogout: {
    fontFamily: fonts.SofiaPro,
    fontSize: 16,
    color: colors.error,
  },
  row: {
    flexDirection: 'row',
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
