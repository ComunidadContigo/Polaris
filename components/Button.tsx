import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { button } from '../styles/buttons';
import colors from '../styles/colors';
import text from '../styles/text';

interface Props {
  label: string;
  onPress: () => void;
}

const Button = (props: Props) => {
  const { label, onPress } = props;
  return (
    <TouchableOpacity
      style={
        label === 'SignUp'
          ? [styles.borderedButton]
          : [styles.button, colors.mainColors.background]
      }
      onPress={onPress}
    >
      <Text
        style={
          label === 'SignUp'
            ? [text.normalTextSize, colors.lightBackground.text]
            : [text.normalTextSize, colors.mainColors.text]
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  borderedButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default Button;
