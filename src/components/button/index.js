import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors, fonts} from '../../utils';

const Button = ({
  title,
  style,
  textStyle,
  type,
  onPress,
  isLoading,
  disabled,
}) => {
  if (type === 'text') {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container2, style]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.text]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: colors.buttonPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  container2: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: fonts.SofiaProBold,
  },
});
