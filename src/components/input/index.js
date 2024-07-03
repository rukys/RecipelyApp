import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../utils';
import Gap from '../gap';
import {IconEye, IconEyeOff} from '../../assets';

const Input = ({
  type,
  label,
  placeholder,
  value,
  onChangeText,
  errorMessage,
  disable,
  labelStyle,
  containerStyle,
  inputStyle,
  placeholderColor,
  multiline = false,
  root,
  ...rest
}) => {
  const [secure, setSecure] = useState(true);
  return (
    <View style={root}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Gap height={5} />
      <View style={[styles.container, containerStyle]}>
        <TextInput
          value={value}
          editable={disable}
          style={[styles.textInput, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderColor ? placeholderColor : colors.white
          }
          multiline={multiline}
          onChangeText={onChangeText}
          secureTextEntry={type === 'password' && secure}
          {...rest}
        />
        {type === 'password' && (
          <TouchableOpacity
            onPress={() => {
              setSecure(!secure);
            }}>
            {secure ? (
              <IconEye width={25} height={25} />
            ) : (
              <IconEyeOff width={25} height={25} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <View>
          <Gap height={5} />
          <Text style={styles.textError}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 8,
    backgroundColor: colors.primary,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontFamily: fonts.SofiaPro,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.SofiaPro,
    color: colors.white,
    marginLeft: 3,
  },
  textError: {
    fontSize: 14,
    fontFamily: fonts.SofiaPro,
    marginLeft: 3,
    color: colors.error,
  },
});
