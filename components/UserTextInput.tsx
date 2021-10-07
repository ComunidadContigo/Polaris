import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { mainPurple, errorRed } from '../styles/colors';
import Icon from 'react-native-vector-icons/AntDesign';

interface props {
  icon: string;
  [x: string]: any; // For the ...otherProps
}

const UserTextInput = (props: props) => {
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
