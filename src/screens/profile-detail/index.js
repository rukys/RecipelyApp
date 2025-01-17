/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import RadioGroup from 'react-native-radio-buttons-group';
import DatePicker from 'react-native-date-picker';
import ReactNativeModal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from '../../utils';
import {Button, Gap, Header, Input} from '../../components';
import {IconEditPhoto, ImgDefault} from '../../assets';
import {globalStore, userStore} from '../../stores';
import tw from '../../../tailwind';

export default function ProfileDetailScreen({navigation}) {
  const getUser = userStore(state => state.user);
  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);
  const [photo, setPhoto] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [date, setDate] = useState(new Date());

  const [isVisibleDOB, setIsVisibleDOB] = useState(false);
  const [isVisibleGender, setIsVisibleGender] = useState(false);

  const disableButton = fullName === '' || gender === null || dob === null;

  const submitSendEmailVerification = () => {
    auth().onAuthStateChanged(user => {
      if (user.emailVerified) {
        setIsEmailVerified(true);
        showMessage('Email sudah diverifikasi', 'success');
      } else {
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
      }
    });
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
          setPhoto(getData?.photo);
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

  const onLaunchImageLibrary = () => {
    const reference = storage().ref(`users/${getUser.uid}.png`);

    launchImageLibrary({quality: 0.5}, response => {
      if (response.didCancel || response.errorMessage) {
        // cancel choose photo
      } else {
        setSpinner(true);
        const source = {uri: response.assets[0].uri};
        const task = reference.putFile(source?.uri);
        task.then(res => {
          const getUrl = storage()
            .ref(`users/${res.metadata.name}`)
            .getDownloadURL();

          getUrl.then(result => {
            database()
              .ref('/users/' + getUser.uid)
              .update({
                photo: result,
              })
              .then(() => {
                getDataFromDatabase();
                showMessage('Foto berhasil di ubah', 'success');
                setSpinner(false);
              });
          });
        });
      }
    });
  };

  useEffect(() => {
    if (getUser) {
      auth().onAuthStateChanged(user => {
        setIsEmailVerified(user.emailVerified);
      });
    }

    getDataFromDatabase();

    return () => getDataFromDatabase();
  }, []);

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        backgroundColor={tw.color('white')}
        barStyle={'dark-content'}
      />
      <Header
        title="Ubah Profil"
        style={tw.style('bg-white')}
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView>
        <Gap height={36} />
        <View style={tw.style('self-center')}>
          <Image
            source={photo ? {uri: photo} : ImgDefault}
            style={tw.style('h-32 w-32 rounded-full')}
          />
          <TouchableOpacity
            style={tw.style('absolute bottom-0 right-0 mr-2')}
            onPress={onLaunchImageLibrary}>
            <IconEditPhoto height={32} width={32} />
          </TouchableOpacity>
        </View>
        <Gap height={24} />
        <View style={tw.style('flex-1 bg-white')}>
          <Gap height={16} />
          <View style={tw.style('mx-4')}>
            <Input
              label="Nama Lengkap"
              value={fullName}
              labelStyle={tw.style('text-textPrimary')}
              containerStyle={tw.style(
                'flex-1 bg-white border-textPrimary rounded-lg',
              )}
              inputStyle={tw.style('text-textPrimary')}
              onChangeText={val => setFullName(val)}
              placeholderColor={tw.color('textPrimary')}
            />
          </View>
          <Gap height={16} />
          <View style={tw.style('mx-4 flex-row')}>
            <Input
              disable
              label="Email"
              value={email}
              labelStyle={tw.style('text-textPrimary')}
              containerStyle={tw.style(
                'flex-1 bg-white border-textPrimary rounded-lg',
              )}
              inputStyle={tw.style('text-textPrimary')}
              root={tw.style('flex-1')}
              placeholderColor={tw.color('textPrimary')}
            />
            {!isEmailVerified ? (
              <>
                <Gap width={8} />
                <Button
                  style={tw.style('h-14 w-24 mt-6 bg-primary')}
                  title="Verifikasi"
                  isLoading={isLoading}
                  onPress={submitSendEmailVerification}
                />
              </>
            ) : null}
          </View>
        </View>
        <Gap height={16} />
        <View style={tw.style('mx-4')}>
          <Text style={tw.style('text-md font-sofia text-textPrimary ml-1')}>
            Jenis Kelamin
          </Text>
          <Gap height={5} />
          <TouchableOpacity
            style={tw.style(
              'flex-row items-center h-14 rounded-lg border border-textPrimary px-2 bg-white',
            )}
            onPress={() => setIsVisibleGender(true)}>
            <Text
              style={
                gender === null || gender === undefined
                  ? tw.style('text-md font-sofia text-textGrey ml-1')
                  : tw.style('text-textPrimary')
              }>
              {gender === null || gender === undefined
                ? 'Masukkan jenis kelamin Anda'
                : gender === 0
                ? 'Laki-laki'
                : 'Perempuan'}
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={16} />
        <View style={tw.style('mx-4')}>
          <Text style={tw.style('text-md font-sofia text-textPrimary ml-1')}>
            Tanggal Lahir
          </Text>
          <Gap height={5} />
          <TouchableOpacity
            style={tw.style(
              'flex-row items-center h-14 rounded-lg border border-textPrimary px-2 bg-white',
            )}
            onPress={() => setIsVisibleDOB(true)}>
            <Text
              style={
                dob === null || dob === undefined
                  ? tw.style('text-md font-sofia text-textGrey ml-1')
                  : tw.style('text-textPrimary')
              }>
              {dob === null || dob === undefined
                ? 'Masukkan tanggal lahir Anda'
                : dob}
            </Text>
          </TouchableOpacity>
        </View>
        <Gap height={36} />
        <View style={tw.style('mx-4')}>
          <Button
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
        <View style={tw.style('bg-white rounded-lg p-4')}>
          <Text style={tw.style('font-sofiaBold text-base text-textPrimary')}>
            Pilih Jenis Kelamin
          </Text>
          <Gap height={8} />
          <RadioGroup
            containerStyle={tw.style('items-start -ml-2')}
            labelStyle={tw.style('font-sofia text-textPrimary text-md')}
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
          <View style={tw.style('flex-row')}>
            <Button
              style={tw.style('flex-1 bg-white border-textPrimary border')}
              textStyle={tw.style('font-sofiaBold text-textPrimary')}
              type="text"
              title="Kembali"
              onPress={() => setIsVisibleGender(false)}
            />
            <Gap width={16} />
            <Button
              style={tw.style('flex-1')}
              title="Simpan"
              onPress={() => setIsVisibleGender(false)}
            />
          </View>
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        isVisible={isVisibleDOB}
        onBackdropPress={() => setIsVisibleDOB(false)}>
        <View style={tw.style('bg-white rounded-lg p-4')}>
          <Text style={tw.style('font-sofiaBold text-base text-textPrimary')}>
            Pilih Tanggal Lahir
          </Text>
          <Gap height={8} />
          <DatePicker
            date={date}
            mode="date"
            onDateChange={val => {
              setDate(val);
            }}
          />
          <Gap height={16} />
          <View style={tw.style('flex-row')}>
            <Button
              style={tw.style('flex-1 bg-white border-textPrimary border')}
              textStyle={tw.style('font-sofiaBold text-textPrimary')}
              type="text"
              title="Kembali"
              onPress={() => setIsVisibleDOB(false)}
            />
            <Gap width={16} />
            <Button
              style={tw.style('flex-1')}
              title="Simpan"
              onPress={() => {
                setIsVisibleDOB(false);
                setDob(moment(date).format('DD/MM/YYYY'));
              }}
            />
          </View>
        </View>
      </ReactNativeModal>

      <Spinner
        visible={spinner}
        textContent={'Mohon tunggu...'}
        textStyle={tw.style('text-white')}
      />
    </View>
  );
}
