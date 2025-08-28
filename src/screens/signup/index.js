import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import {getApp} from '@react-native-firebase/app';
import {getDatabase, ref, set} from '@react-native-firebase/database';
import React, {useState} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import tw from '../../../tailwind';
import {IconChef, ImgPattern} from '../../assets';
import {Button, Gap, Input} from '../../components';
import useRemoteSetting from '../../hooks/use-remote-setting';
import {globalStore, userStore} from '../../stores';
import {showMessage, useForm} from '../../utils';

export default function SignupScreen({navigation}) {
  const [messageError, setMessageError] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {remoteSetting} = useRemoteSetting();

  const setUser = userStore(state => state.setUser);
  const setIsLoading = globalStore(state => state.setLoading);
  const isLoading = globalStore(state => state.loading);

  const [form, setForm] = useForm({
    fullName: '',
    email: '',
    password: '',
  });

  const onValidationSubmit = () => {
    if (
      (form.fullName || form.email || form.password) === '' ||
      !toggleCheckBox
    ) {
      showMessage('Semua harap diisi', 'danger');
    } else if (form.fullName === '') {
      showMessage('Nama lengkap tidak boleh kosong', 'danger');
    } else if (form.email === '') {
      showMessage('Email tidak boleh kosong', 'danger');
    } else if (form.password === '') {
      showMessage('Kata sandi tidak boleh kosong', 'danger');
    } else if (form.password.length < 6) {
      showMessage('Kata sandi minimal 6 karakter', 'danger');
    } else {
      setIsLoading(true);
      onSubmitCreateAccount();
    }
  };

  const onSubmitCreateAccount = () => {
    auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(response => {
        if (response?.user) {
          const store = {
            uid: response?.user?.uid,
            email: form.email,
            fullName: form.fullName,
            isNotif: false,
            isActive: true,
            language: 'id',
          };

          const app = getApp();
          const db = getDatabase(app);
          const userRef = ref(db, '/users/' + response?.user?.uid + '/');

          set(userRef, store).then(() => {
            setIsLoading(false);
            setUser(store);
            showMessage(
              'Akun berhasil dibuat, Selamat datang di Recipely',
              'success',
            );
            navigation.reset({
              index: 0,
              routes: [{name: 'AppBarScreen'}],
            });
          });
        }
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          showMessage(
            'Email ini sudah pernah dibuat, gunakan email lain',
            'danger',
          );
        }
        if (error.code === 'auth/invalid-email') {
          showMessage('Masukkan email dengan benar', 'danger');
        }
      });
  };

  const onNavigateWebview = (valUrl, title) => {
    navigation.navigate('WebviewScreen', {url: valUrl, titleHeader: title});
  };

  return (
    <>
      <StatusBar backgroundColor={tw.style('primary')} />
      <ScrollView style={tw.style('flex-1 bg-primary')}>
        <Gap height={64} />
        <View style={tw.style('absolute')}>
          <ImgPattern />
        </View>
        <View style={tw.style('mx-4 items-center')}>
          <IconChef width={55} height={55} />
          <Gap width={8} />
          <Text style={tw.style('text-xl font-sofiaExtraLight text-white')}>
            Recipely
          </Text>
        </View>
        <Gap height={24} />
        <View style={tw.style('mx-4')}>
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan Nama Lengkap Anda"
            onChangeText={value => {
              setForm('fullName', value);
            }}
          />
          <Gap height={16} />
          <Input
            label="Email"
            placeholder="Masukkan Email Anda"
            onChangeText={value => {
              setForm('email', value);
            }}
          />
          <Gap height={16} />
          <Input
            type="password"
            label="Kata Sandi"
            placeholder="Masukkan Kata Sandi Anda"
            errorMessage={messageError}
            onChangeText={value => {
              setMessageError('');
              setForm('password', value);
            }}
          />
        </View>
        <Gap height={24} />
        <View style={tw.style('flex-row items-center mx-4')}>
          <CheckBox
            value={toggleCheckBox}
            tintColors={tw.color('textPriamry')}
            onCheckColor={tw.color('textPriamry')}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Gap width={5} />
          <View style={tw.style('items-center')}>
            <Text style={tw.style('font-sofia text-md text-white')}>
              Dengan mendaftar, saya menyetujui{' '}
              <Text
                onPress={() =>
                  onNavigateWebview(
                    remoteSetting?.url_privacy,
                    'Syarat dan Ketentuan',
                  )
                }
                style={tw.style('font-sofia text-md text-white underline')}>
                Syarat dan Ketentuan
              </Text>{' '}
              serta{' '}
              <Text
                onPress={() =>
                  onNavigateWebview(
                    remoteSetting?.url_privacy,
                    'Kebijakan dan Privasi',
                  )
                }
                style={tw.style('font-sofia text-md text-white underline')}>
                Kebijakan Privasi
              </Text>
            </Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={tw.style('mx-4')}>
          <Button
            title="Buat Akun"
            disabled={isLoading}
            onPress={onValidationSubmit}
            isLoading={isLoading}
          />
        </View>
        <Gap height={16} />
      </ScrollView>
    </>
  );
}
