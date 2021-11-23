/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { errorRed, mainPurple } from '../styles/colors';

interface Props {
  error: string | undefined;
  touched: boolean | undefined;
  [x: string]: any; // For the ...otherProps
}

const UserPicker = (props: Props) => {
  const { error, touched, ...otherProps } = props;
  const validationColor = !touched
    ? mainPurple
    : error
    ? errorRed
    : mainPurple;

  return (
    <View style={[styles.textInput, { borderColor: validationColor }]}>
      <Picker {...otherProps}>
        <Picker.Item label="Choose Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Non-Binary" value="non" />
        <Picker.Item label="Other" value="other" />
        <Picker.Item label="Prefer not to answer" value="noanswer" />
      </Picker>
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

export default UserPicker;
