/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { mainPurple, errorRed } from '../styles/colors';

interface Props {
  icon: string;
  error: string | undefined;
  touched: boolean | undefined;
  [x: string]: any; // For the ...otherProps
}

const UserTextInput = (props: Props) => {
  const { icon, error, touched, ...otherProps } = props;
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
      <View style={{ flex: 1 }}>
        <TextInput {...otherProps} />
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
  },
});

export default UserTextInput;
