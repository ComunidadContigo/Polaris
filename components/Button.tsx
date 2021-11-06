import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { button } from '../styles/buttons';
import colors from '../styles/colors';
import text from '../styles/text';

interface Props {
  label: string;
  onPress: () => void;
  customStyle?: keyof typeof styles;
}

const Button = (props: Props) => {
  const { label, onPress, customStyle } = props;
  return (
    <TouchableOpacity
      style={
        customStyle
          ? styles[customStyle]
          : [styles.button, colors.mainColors.background]
      }
      onPress={onPress}
    >
      <Text
        style={
          customStyle === 'borderedButton'
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
  lightButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
});

export default Button;
