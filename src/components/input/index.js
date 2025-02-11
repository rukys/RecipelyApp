import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import tw from '../../../tailwind';
import Gap from '../gap';

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
      <Text
        style={[tw.style('text-md font-sofia text-white ml-1'), labelStyle]}>
        {label}
      </Text>
      <Gap height={5} />
      <View
        style={[
          tw.style(
            'flex-row items-center h-14 rounded-lg border border-white px-2 bg-primary',
          ),
          containerStyle,
        ]}>
        <TextInput
          value={value}
          editable={disable}
          style={[tw.style('flex-1 text-white font-sofia'), inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderColor ? placeholderColor : tw.color('white')
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
            <FontAwesomeIcon
              name={secure ? 'eye' : 'eye-slash'}
              size={18}
              color={tw.color('white')}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <View>
          <Gap height={5} />
          <Text style={tw.style('text-md font-sofia ml-1 text-error')}>
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Input;
