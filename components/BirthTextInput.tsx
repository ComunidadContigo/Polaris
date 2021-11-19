/* eslint-disable indent */
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaskedTextInput } from 'react-native-mask-text';
import { mainPurple, errorRed } from '../styles/colors';

interface Props {
  icon: string;
  error: string | undefined;
  touched: boolean | undefined;
  onChangeText: any;
  [x: string]: any; // For the ...otherProps
}

const BirthTextInput = (props: Props) => {
  const { icon, error, touched, onChangeText, ...otherProps } = props;

  const hasErrors = !!error;
  const validationColor = !touched
    ? mainPurple
    : hasErrors
    ? errorRed
    : mainPurple;

  return (
    <View style={[styles.textInput, { borderColor: validationColor }]}>
      <View style={{ padding: 8 }}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <MaskedTextInput
        onChangeText={onChangeText}
        // style={styles.input}
        keyboardType="numeric"
        {...otherProps}
      />
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
  input: {
    height: 40,
    margin: 12,
  },
});

export default BirthTextInput;
