/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import {colors, fonts, showMessage} from '../../utils';
import {Button, Gap, Header, Input} from '../../components';
import {
  // IconEditPhoto,
  ImgDefault,
} from '../../assets';
import {globalStore, userStore} from '../../stores';

export default function ProfileDetailScreen() {
  const navigation = useNavigation();

  const getUser = userStore(state => state.user);
  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);

  const [date, setDate] = useState(new Date());

  const [isVisibleDOB, setIsVisibleDOB] = useState(false);
  const [isVisibleGender, setIsVisibleGender] = useState(false);

  const getEmailVerified = auth().currentUser.emailVerified;

  const disableButton = fullName === '' || gender === null || dob === null;

  const submitSendEmailVerification = () => {
    setIsLoading(true);
    setTimeout(() => {
      auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          setIsLoading(false);
          showMessage(
            'Verifikasi email berhasil dikirim, cek email Anda',
            'success',
          );
        });
    }, 1500);
  };

  const getDataFromDatabase = () => {
    database()
      .ref('/users/' + getUser.uid)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const getData = snapshot.val() || {};
          setFullName(getData?.fullName);
          setEmail(getData?.email);
          setGender(getData?.gender);
          setDob(getData?.dob);
        }
      });
  };

  const onSubmitUpdateProfile = () => {
    database()
      .ref('/users/' + getUser.uid)
      .update({
        fullName: fullName,
        gender: gender,
        dob: dob,
      })
      .then(() => {
        getDataFromDatabase();
        showMessage('Profil berhasil di ubah', 'success');
      });
  };

  useEffect(() => {
    getDataFromDatabase();

    return () => getDataFromDatabase();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <ScrollView style={styles.page}>
        <Header
          title="Ubah Profil"
          textStyle={styles.titleHeader}
          onPressBack={() => navigation.goBack()}
        />
        <Gap height={36} />
        <View style={styles.containerAvatar}>
          <Image source={ImgDefault} style={styles.avatar} />
          {/* <TouchableOpacity style={styles.editPhoto}>
            <IconEditPhoto height={32} width={32} />
          </TouchableOpacity> */}
        </View>
        <Gap height={24} />
        <View style={styles.content}>
          <Gap height={16} />
          <View style={styles.containerMargin}>
            <Input
              label="Nama Lengkap"
              value={fullName}
              labelStyle={styles.label}
              containerStyle={styles.containerInput}
              inputStyle={styles.input}
              onChangeText={val => setFullName(val)}
            />
          </View>
          <Gap height={16} />
          <View style={[styles.containerMargin, styles.row]}>
            <Input
              disable
              label="Email"
              value={email}
              labelStyle={styles.label}
              containerStyle={styles.containerInput}
              inputStyle={styles.input}
              root={styles.flex}
            />
            {!getEmailVerified ? (
              <>
                <Gap width={8} />
                <Button
                  style={styles.buttonVerif}
                  title="Verifikasi"
                  isLoading={isLoading}
                  onPress={submitSendEmailVerification}
                />
              </>
            ) : null}
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.containerMargin}>
          <Text style={styles.labelDOB}>Jenis Kelamin</Text>
          <Gap height={5} />
          <TouchableOpacity
            style={styles.containerDOB}
            onPress={() => setIsVisibleGender(true)}>
            <Text style={gender === null ? styles.textPlacDOB : styles.label}>
              {gender === null
                ? 'Masukkan jenis kelamin Anda'
                : gender === 0
                ? 'Laki-laki'
                : 'Perempuan'}
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={16} />
        <View style={styles.containerMargin}>
          <Text style={styles.labelDOB}>Tanggal Lahir</Text>
          <Gap height={5} />
          <TouchableOpacity
            style={styles.containerDOB}
            onPress={() => setIsVisibleDOB(true)}>
            <Text style={dob === null ? styles.textPlacDOB : styles.label}>
              {dob === null ? 'Masukkan tanggal lahir Anda' : dob}
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={36} />
        <View style={styles.containerMargin}>
          <Button
            style={styles.buttonEdit}
            title="Simpan Perubahan"
            disabled={disableButton}
            onPress={() => onSubmitUpdateProfile()}
          />
        </View>
        <Gap height={36} />
      </ScrollView>

      <ReactNativeModal
        isVisible={isVisibleGender}
        onBackdropPress={() => setIsVisibleGender(false)}>
        <View style={styles.containerModalGender}>
          <Text style={styles.titleModalGender}>Pilih Jenis Kelamin</Text>
          <Gap height={8} />
          <RadioGroup
            containerStyle={styles.containerRadio}
            labelStyle={styles.textRadio}
            radioButtons={[
              {
                id: 0,
                label: 'Laki-laki',
                value: 'Male',
              },
              {
                id: 1,
                label: 'Perempuan',
                value: 'Woman',
              },
            ]}
            onPress={val => {
              setGender(val);
            }}
            selectedId={gender}
          />
          <Gap height={16} />
          <View style={styles.row}>
            <Button
              style={[styles.flex, styles.buttonCancel]}
              textStyle={styles.textButtonCancel}
              type="text"
              title="Kembali"
              onPress={() => setIsVisibleGender(false)}
            />
            <Gap width={16} />
            <Button
              style={styles.flex}
              title="Simpan"
              onPress={() => setIsVisibleGender(false)}
            />
          </View>
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        isVisible={isVisibleDOB}
        onBackdropPress={() => setIsVisibleDOB(false)}>
        <View style={styles.containerModalPicker}>
          <Text style={styles.titleModalGender}>Pilih Tanggal Lahir</Text>
          <Gap height={8} />
          <DatePicker
            date={date}
            mode="date"
            onDateChange={val => {
              setDate(val);
            }}
          />
          <Gap height={16} />
          <View style={styles.row}>
            <Button
              style={[styles.flex, styles.buttonCancel]}
              textStyle={styles.textButtonCancel}
              type="text"
              title="Kembali"
              onPress={() => setIsVisibleDOB(false)}
            />
            <Gap width={16} />
            <Button
              style={styles.flex}
              title="Simpan"
              onPress={() => {
                setIsVisibleDOB(false);
                setDob(moment(date).format('DD/MM/YYYY'));
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
  titleHeader: {},
  containerAvatar: {
    alignSelf: 'center',
  },
  editPhoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 8,
  },
  avatar: {
    height: 125,
    width: 125,
    borderRadius: 75,
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerMargin: {
    marginHorizontal: 16,
  },
  containerInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.textPrimary,
  },
  input: {
    color: colors.textPrimary,
  },
  label: {
    color: colors.textPrimary,
  },
  buttonVerif: {
    height: 55,
    width: 100,
    marginTop: 24,
    backgroundColor: colors.primary,
  },
  buttonEdit: {},
  labelDOB: {
    fontSize: 14,
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    marginLeft: 3,
  },
  containerDOB: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  textDOB: {
    fontSize: 14,
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    marginLeft: 3,
  },
  textPlacDOB: {
    fontSize: 14,
    fontFamily: fonts.SofiaPro,
    color: colors.textGrey,
    marginLeft: 3,
  },
  containerModalGender: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
  },
  titleModalGender: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  titlSubeModalGender: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textPrimary,
  },
  containerRadio: {
    alignItems: 'flex-start',
    marginLeft: -8,
  },
  textRadio: {
    fontFamily: fonts.SofiaPro,
    color: colors.textPrimary,
    fontSize: 14,
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
  containerModalPicker: {
    backgroundColor: colors.white,
    // height: 100,
    borderRadius: 16,
    padding: 16,
  },
});
