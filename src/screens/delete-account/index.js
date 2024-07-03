import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {colors, fonts, showMessage} from '../../utils';
import {Button, Gap, Header, Input, ModalConfirm} from '../../components';
import {userStore} from '../../stores';

export default function DeleteAccountScreen({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');

  const getUser = userStore(state => state.user);
  const setUser = userStore(state => state.setUser);

  const onSubmitDeactiveAccount = () => {
    setVisible(false);
    setTimeout(() => {
      database()
        .ref('/users/' + getUser.uid)
        .update({
          isActive: false,
        })
        .then(() => {
          auth()
            .signOut()
            .then(() => {
              setIsLoading(false);
              setUser({});
              showMessage(
                'Akun Anda berhasil di hapus dari aplikasi',
                'success',
              );
              navigation.reset({
                index: 0,
                routes: [{name: 'OnboardScreen'}],
              });
            });
        });
    }, 2000);
  };

  return (
    <>
      <View style={styles.page}>
        <Header
          title="Hapus Akun"
          onPressBack={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.content}>
          <Input
            label="Alasan"
            multiline
            value={reason}
            inputStyle={styles.input}
            labelStyle={styles.label}
            containerStyle={styles.containerInput}
            placeholderColor={colors.textGrey}
            placeholder="Tuliskan alasan lengkap"
            onChangeText={val => setReason(val)}
            maxLength={300}
          />
          <Gap height={5} />
          <Text style={styles.countText}>{reason.length + '/300'}</Text>
          <Gap height={8} />
          <View style={styles.row}>
            <CheckBox
              value={toggleCheckBox}
              tintColors={colors.textPrimary}
              onCheckColor={colors.primary}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Gap width={5} />
            <Text style={styles.desc}>
              Dengan ini saya menyetujui penghapusan akun
            </Text>
          </View>
          <Gap height={24} />
          <Button
            title="Hapus Akun"
            isLoading={isLoading}
            onPress={() => {
              setVisible(true);
              setIsLoading(true);
            }}
            disabled={!toggleCheckBox}
          />
        </View>
      </View>

      <ModalConfirm
        visible={visible}
        titleModal="Konfirmasi Hapus Akun"
        subTitleModal="Akun Anda akan di hapus permanen dari aplikasi"
        buttonTextRight="Hapus"
        onBackdropPress={() => setVisible(!visible)}
        onCancel={() => setVisible(!visible)}
        onPress={onSubmitDeactiveAccount}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textPrimary,
  },
  input: {
    alignSelf: 'flex-start',
    color: colors.textPrimary,
  },
  label: {
    color: colors.textPrimary,
  },
  containerInput: {
    backgroundColor: colors.white,
    borderColor: colors.textPrimary,
    height: 150,
  },
  countText: {
    fontFamily: fonts.SofiaProLight,
    color: colors.textGrey,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
});
