import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {colors, fonts, showMessage, useForm} from '../../utils';
import {ImgPattern} from '../../assets';
import {Button, Gap, Header, Input} from '../../components';
import {globalStore} from '../../stores';

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
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.page}>
        <View style={styles.pattern}>
          <ImgPattern />
        </View>
        <Header
          isWhite
          title="Lupa Kata Sandi"
          textStyle={styles.textHeader}
          onPressBack={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <Gap height={80} />
          <Text style={styles.title}>
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  pattern: {
    position: 'absolute',
  },
  content: {
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  textHeader: {
    color: colors.white,
  },
  title: {
    fontFamily: fonts.SofiaPro,
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
});
