import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils';
import Button from '../button';

const ButtonSwitch = ({titleLeft, titleRight, onPress = () => {}}) => {
  const [active, setActive] = useState(false);

  const onSwitchButton = bool => {
    onPress();
    setActive(bool);
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Button
        type={active ? 'text' : ''}
        style={active ? styles.buttonLeft : styles.buttonRight}
        textStyle={active ? styles.textLeft : styles.textRight}
        title={titleLeft}
        onPress={() => {
          onSwitchButton(false);
        }}
      />
      <Button
        type={active ? '' : 'text'}
        style={active ? styles.buttonRight : styles.buttonLeft}
        textStyle={active ? styles.textRight : styles.textLeft}
        title={titleRight}
        onPress={() => {
          onSwitchButton(true);
        }}
      />
    </TouchableOpacity>
  );
};

export default ButtonSwitch;

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: colors.grey,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  buttonLeft: {
    flex: 1,
    height: 45,
    borderRadius: 10,
  },
  textLeft: {
    color: colors.textPrimary,
  },
  buttonRight: {
    flex: 1,
    height: 45,
    alignSelf: 'center',
  },
  textRight: {
    color: colors.textPrimary,
  },
});
