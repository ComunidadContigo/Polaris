/* eslint-disable indent */
import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Dash from 'react-native-vector-icons/Octicons';
// import DatePicker from 'react-native-date-picker';
import { mainPurple, errorRed } from '../styles/colors';

interface Props {
  icon: string;
  errors: (string | undefined)[];
  touched: boolean | undefined;
  setFieldValue: any;
  [x: string]: any; // For the ...otherProps
}

const BirthTextInput = (props: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { icon, errors, touched, setFieldValue, ...otherProps } = props;
  const hasErrors = errors.filter((err) => err !== undefined);
  const validationColor = !touched
    ? mainPurple
    : hasErrors.length > 0
    ? errorRed
    : mainPurple;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View style={[styles.dateInput, { borderColor: validationColor }]}>
      <View style={{ padding: 8 }}>
        <Icon name={icon} color={validationColor} size={16} />
      </View>
      <View style={styles.button}>
        <Button title="Show Date Picker" onPress={showDatePicker} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date: Date) => {
            setFieldValue('birthdate', date.toISOString());
            hideDatePicker();
          }}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

// const BirthTextInput = (props: Props) => {
//   // const { icon, errors, touched, handleChange, ...otherProps } = props;
//   // const hasErrors = errors.filter((err) => err !== undefined);
//   // const validationColor = !touched
//   //   ? mainPurple
//   //   : hasErrors.length > 0
//   //   ? errorRed
//   //   : mainPurple;
//   return (
//     <View style={[styles.textInput, { borderColor: validationColor }]}>
//       <View style={{ padding: 8 }}>
//         <Icon name={icon} color={validationColor} size={16} />
//       </View>
//       <View style={{ flex: 1, flexDirection: 'row' }}>
//         <TextInput
//           placeholder="  mm  "
//           {...otherProps}
//           onChangeText={handleChange('birthmonth')}
//         />
//         <View style={{ padding: 8 }}>
//           <Dash name="dash" color="black" size={16} />
//         </View>
//         <TextInput
//           placeholder="  dd  "
//           {...otherProps}
//           onChangeText={handleChange('birthday')}
//         />
//         <View style={{ padding: 8 }}>
//           <Dash name="dash" color="black" size={16} />
//         </View>
//         <TextInput
//           placeholder="  yyyy  "
//           {...otherProps}
//           onChangeText={handleChange('birthyear')}
//         />
//       </View>
//     </View>
//   );
// };
const styles = StyleSheet.create({
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    borderColor: mainPurple,
  },
  button: {
    alignItems: 'center',
    backgroundColor: mainPurple,
    color: mainPurple,
  },
});

export default BirthTextInput;
