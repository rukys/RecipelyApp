import React from 'react';
import {Text, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import tw from '../../../tailwind';
import Button from '../button';
import Gap from '../gap';

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
      <View style={tw.style('p-4 bg-white rounded-lg')}>
        <Text style={tw.style('font-sofiaBold text-base text-textPrimary')}>
          {titleModal}
        </Text>
        <Gap height={5} />
        <Text style={tw.style('font-sofia text-md text-textPrimary')}>
          {subTitleModal}
        </Text>
        <Gap height={36} />
        <View style={tw.style('flex-row')}>
          <Button
            style={tw.style('flex-1 bg-white border-textPrimary border')}
            textStyle={tw.style('font-sofiaBold text-textPrimary')}
            type="text"
            title={buttonTextLeft ? buttonTextLeft : 'Tidak'}
            onPress={() => {
              onBackdropPress();
              onCancel();
            }}
          />
          <Gap width={16} />
          <Button
            style={tw.style('flex-1')}
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
