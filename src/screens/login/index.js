import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {IconChef, ImgPattern} from '../../assets';
import {colors, fonts, showMessage, useForm} from '../../utils';
import {Button, Gap, Input} from '../../components';
import {globalStore, userStore} from '../../stores';

export default function LoginScreen({navigation}) {
  const setUser = userStore(state => state.setUser);
  const setIsLoading = globalStore(state => state.setLoading);
  const isLoading = globalStore(state => state.loading);

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onValidationSubmit = () => {
    if ((form.email || form.password) === '') {
      showMessage('Semua harap diisi', 'danger');
    } else if (form.email === '') {
      showMessage('Email tidak boleh kosong', 'danger');
    } else if (form.password === '') {
      showMessage('Kata sandi tidak boleh kosong', 'danger');
    } else {
      setIsLoading(true);
      onSubmitSignin();
    }
  };

  const onSubmitSignin = () => {
    auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(response => {
        if (response?.user) {
          database()
            .ref('/users/' + response?.user?.uid)
            .once('value')
            .then(snapshot => {
              const getData = snapshot.val();
              if (getData?.isActive) {
                setIsLoading(false);
                setUser(snapshot.val());
                showMessage('Selamat datang di Recipely', 'success');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'AppBarScreen'}],
                });
              } else {
                setIsLoading(false);
                showMessage('Account Anda sudah tidak aktif', 'danger');
              }
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

  const onNavigateForgot = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.page}>
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
            onChangeText={value => {
              setForm('password', value);
            }}
          />
          <Gap height={8} />
          <Button
            type="text"
            style={styles.button}
            title="Lupa Kata Sandi?"
            onPress={onNavigateForgot}
          />
        </View>
        <Gap height={36} />
        <View style={styles.containerButton}>
          <Button
            title="Masuk"
            disabled={isLoading}
            onPress={onValidationSubmit}
            isLoading={isLoading}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
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
});
