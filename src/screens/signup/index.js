import React, {useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import CheckBox from '@react-native-community/checkbox';
import {colors, fonts, showMessage, useForm} from '../../utils';
import {IconChef, ImgPattern} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {globalStore, userStore} from '../../stores';
import useRemoteSetting from '../../hooks/use-remote-setting';

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
          database()
            .ref('/users/' + response?.user?.uid + '/')
            .set(store)
            .then(() => {
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
      <StatusBar backgroundColor={colors.primary} />
      <ScrollView style={styles.page}>
        <Gap height={64} />
        <View style={styles.pattern}>
          <ImgPattern />
        </View>
        <View style={styles.containerLogo}>
          <IconChef width={55} height={55} />
          <Gap width={8} />
          <Text style={styles.titleLogo}>Recipely</Text>
        </View>
        <Gap height={24} />
        <View style={styles.containerForm}>
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
        <View style={styles.row}>
          <CheckBox
            value={toggleCheckBox}
            tintColors={colors.textPrimary}
            onCheckColor={colors.textPrimary}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Gap width={5} />
          <View style={styles.syarat}>
            <Text style={styles.desc}>
              Dengan mendaftar, saya menyetujui{' '}
              <Text
                onPress={() =>
                  onNavigateWebview(
                    remoteSetting?.url_terms,
                    'Syarat dan Ketentuan',
                  )
                }
                style={[styles.desc, styles.underline]}>
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
                style={[styles.desc, styles.underline]}>
                Kebijakan Privasi
              </Text>
            </Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.containerButton}>
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  pattern: {
    position: 'absolute',
  },
  containerLogo: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  titleLogo: {
    fontSize: 26,
    fontFamily: fonts.SofiaProExtraLight,
    color: colors.white,
  },
  containerForm: {
    marginHorizontal: 16,
  },
  button: {
    alignItems: 'flex-end',
  },
  containerButton: {
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  desc: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.white,
  },
  syarat: {
    alignItems: 'center',
  },
  center: {},
  underline: {
    textDecorationLine: 'underline',
  },
});
