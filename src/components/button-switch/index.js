import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import tw from '../../../tailwind';
import Button from '../button';

const ButtonSwitch = ({
  titleLeft,
  titleRight,
  isDarkMode = false,
  onPress = () => {},
}) => {
  const [active, setActive] = useState(false);

  const onSwitchButton = bool => {
    onPress();
    setActive(bool);
  };

  return (
    <TouchableOpacity
      style={tw.style(
        'h-14 rounded-2xl flex-row justify-center items-center px-1.5',
        isDarkMode ? 'bg-black border border-white' : 'bg-grey',
      )}>
      <Button
        type={active ? 'text' : ''}
        style={tw.style(
          'flex-1 h-11 rounded-xl',
          active ? 'rounded-xl' : 'self-center',
        )}
        textStyle={tw.style(isDarkMode ? 'text-white' : 'text-textPrimary')}
        title={titleLeft}
        onPress={() => {
          onSwitchButton(false);
        }}
      />
      <Button
        type={active ? '' : 'text'}
        style={tw.style(
          'flex-1 h-11 rounded-xl',
          active ? 'self-center' : 'rounded-xl',
        )}
        textStyle={tw.style(isDarkMode ? 'text-white' : 'text-textPrimary')}
        title={titleRight}
        onPress={() => {
          onSwitchButton(true);
        }}
      />
    </TouchableOpacity>
  );
};

export default ButtonSwitch;
