/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { mainPurple, errorRed } from '../styles/colors';

interface Props {
  error: string | undefined;
  touched: boolean | undefined;
  [x: string]: any; // For the ...otherProps
}

const UserTextSignInInput = (props: Props) => {
  const { error, touched, ...otherProps } = props;
  const validationColor = !touched
    ? mainPurple
    : error
    ? errorRed
    : mainPurple;

  return (
    <View
      style={[styles.textInput, { borderBottomColor: validationColor }]}
    >
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
    borderColor: 'transparent',
    borderWidth: 2,
    padding: 8,
    width: '85%',
  },
});

export default UserTextSignInInput;
