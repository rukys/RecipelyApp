import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import tw from '../../../tailwind';
import {ImgPattern} from '../../assets';
import {Button, Gap, Header, Input} from '../../components';
import {globalStore} from '../../stores';
import {showMessage, useForm} from '../../utils';

export default function ForgotPasswordScreen({navigation}) {
  const [message, setMessage] = useState('');
  const [form, setForm] = useForm({
    email: '',
  });

  const isLoading = globalStore(state => state.loading);
  const setIsLoading = globalStore(state => state.setLoading);

  const submitCodeVerification = () => {
    database()
      .ref('/users')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const userData = [];
          Object.keys(oldData).map(key => {
            userData.push(oldData[key]);
          });

          const filter = userData.filter(item => {
            if (item?.email.toLowerCase().includes(form?.email.toLowerCase())) {
              return item;
            }
          });
          if (filter?.length !== 0) {
            setIsLoading(true);
            setTimeout(() => {
              auth()
                .sendPasswordResetEmail(form.email)
                .then(() => {
                  setIsLoading(false);
                  showMessage(
                    'Link ganti kata sandi berhasil di kirim',
                    'success',
                  );
                  navigation.replace('LoginScreen');
                })
                .catch(() => {
                  setIsLoading(false);
                });
            }, 1500);
          } else {
            setMessage('Email tidak terdaftar!');
          }
        }
      });
  };

  return (
    <>
      <StatusBar backgroundColor={tw.color('primary')} />
      <View style={tw.style('flex-1 bg-primary')}>
        <View style={tw.style('absolute')}>
          <ImgPattern />
        </View>
        <Header
          isWhite
          title="Lupa Kata Sandi"
          textStyle={tw.style('text-white')}
          onPressBack={() => navigation.goBack()}
        />
        <View style={tw.style('mx-4 justify-center')}>
          <Gap height={80} />
          <Text style={tw.style('font-sofia text-white text-md text-center')}>
            Masukkan email yang sudah terdaftar, lalu cek di email tersebut
            untuk mendapatkan link mengubah kata sandi terbaru
          </Text>
          <Gap height={16} />
          <Input
            label="Email"
            placeholder="Masukkan Email Anda"
            onChangeText={value => {
              setForm('email', value);
              setMessage('');
            }}
            errorMessage={message}
          />
          <Gap height={24} />
          <Button
            title="Kirim"
            isLoading={isLoading}
            disabled={form?.email === ''}
            onPress={submitCodeVerification}
          />
        </View>
      </View>
    </>
  );
}
