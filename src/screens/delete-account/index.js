import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import tw from '../../../tailwind';
import {Button, Gap, Header, Input, ModalConfirm} from '../../components';
import {userStore} from '../../stores';
import {showMessage} from '../../utils';

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
      <View style={tw.style('flex-1 bg-white')}>
        <Header
          title="Hapus Akun"
          onPressBack={() => {
            navigation.goBack();
          }}
        />
        <View style={tw.style('flex-1 mx-4')}>
          <Input
            label="Alasan"
            multiline
            value={reason}
            inputStyle={tw.style('self-start text-textPrimary')}
            labelStyle={tw.style('text-textPrimary')}
            containerStyle={tw.style('bg-white border-textPrimary h-36')}
            placeholderColor={tw.style('text-textGrey')}
            placeholder="Tuliskan alasan lengkap"
            onChangeText={val => setReason(val)}
            maxLength={300}
          />
          <Gap height={5} />
          <Text
            style={tw.style(
              'font-sofiaLight text-textGrey text-xs self-end mr-1',
            )}>
            {reason.length + '/300'}
          </Text>
          <Gap height={8} />
          <View style={tw.style('flex-row items-center')}>
            <CheckBox
              value={toggleCheckBox}
              tintColors={tw.color('textPrimary')}
              onCheckColor={tw.color('primary')}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Gap width={5} />
            <Text style={tw.style('font-sofia text-md text-textPrimary')}>
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
