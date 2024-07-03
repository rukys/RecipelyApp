import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Gap from '../gap';
import Button from '../button';
import {colors, fonts} from '../../utils';

const ModalConfirm = ({
  visible,
  isLoading,
  titleModal,
  subTitleModal,
  buttonTextLeft,
  buttonTextRight,
  onBackdropPress = () => {},
  onCancel = () => {},
  onPress = () => {},
}) => {
  return (
    <ReactNativeModal isVisible={visible} onBackdropPress={onBackdropPress}>
      <View style={styles.containerModal}>
        <Text style={styles.titleModal}>{titleModal}</Text>
        <Gap height={5} />
        <Text style={styles.titlSubeModal}>{subTitleModal}</Text>
        <Gap height={36} />
        <View style={styles.row}>
          <Button
            style={[styles.button, styles.buttonCancel]}
            textStyle={styles.textButtonCancel}
            type="text"
            title={buttonTextLeft ? buttonTextLeft : 'Tidak'}
            onPress={() => {
              onBackdropPress();
              onCancel();
            }}
          />
          <Gap width={16} />
          <Button
            style={styles.button}
            title={buttonTextRight ? buttonTextRight : 'Ya'}
            onPress={onPress}
            isLoading={isLoading}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalConfirm;

const styles = StyleSheet.create({
  containerModal: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  titleModal: {
    fontFamily: fonts.SofiaProBold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  titlSubeModal: {
    fontFamily: fonts.SofiaPro,
    fontSize: 14,
    color: colors.textPrimary,
  },
  textButton: {
    color: colors.textPrimary,
  },
  button: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
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
});
