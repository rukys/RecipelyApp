import {getApp} from '@react-native-firebase/app';
import {
  getDatabase,
  ref,
  get as getData,
} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import tw from '../../../tailwind';
import {IconChef, ImgPattern} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {globalStore, userStore} from '../../stores';
import {showMessage, useForm} from '../../utils';

export default function LoginScreen({navigation}) {
  const setUser = userStore(state => state.setUser);
  const setIsFirstLogin = userStore(state => state.setIsFirstLogin);
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
          const app = getApp();
          const db = getDatabase(app);
          const userRef = ref(db, `/users/${response.user.uid}`);

          getData(userRef).then(snapshot => {
            const getDataVal = snapshot.val();
            if (getDataVal?.isActive) {
              setIsLoading(false);
              setUser(getDataVal);
              setIsFirstLogin(true);
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
      <StatusBar backgroundColor={tw.color('primary')} />
      <View style={tw.style('flex-1 justify-center bg-primary')}>
        <View style={tw.style('absolute')}>
          <ImgPattern />
        </View>
        <View style={tw.style('mx-4 items-center')}>
          <IconChef width={55} height={55} />
          <Gap width={8} />
          <Text style={tw.style('font-sofiaExtraLight text-3xl text-white')}>
            Recipely
          </Text>
        </View>
        <Gap height={24} />
        <View style={tw.style('mx-4')}>
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
            style={tw.style('items-end')}
            title="Lupa Kata Sandi?"
            onPress={onNavigateForgot}
          />
        </View>
        <Gap height={36} />
        <View style={tw.style('mx-4')}>
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
