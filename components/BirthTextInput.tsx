import * as React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { mainPurple, errorRed } from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dash from 'react-native-vector-icons/Octicons';

interface props {
  icon: string;
  [x: string]: any; // For the ...otherProps
}

const UserTextInput = (props: props) => {
  const { icon, error, touched, handleChange, ...otherProps } = props;
  const validationColor = !touched
    ? mainPurple
    : error
    ? errorRed
    : mainPurple;

  return (
    <View style={[styles.textInput, { borderColor: validationColor }]}>
      <View style={{ padding: 8 }}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
          placeholder='  mm  '
          {...otherProps}
          onChangeText={handleChange('birthmonth')}
        />
        <View style={{ padding: 8 }}>
          <Dash name={'dash'} color='black' size={16} />
        </View>
        <TextInput
          placeholder='  dd  '
          {...otherProps}
          onChangeText={handleChange('birthday')}
        />
        <View style={{ padding: 8 }}>
          <Dash name={'dash'} color='black' size={16} />
        </View>
        <TextInput
          placeholder='  yyyy  '
          {...otherProps}
          onChangeText={handleChange('birthyear')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    borderColor: mainPurple,
  },
});

export default UserTextInput;
