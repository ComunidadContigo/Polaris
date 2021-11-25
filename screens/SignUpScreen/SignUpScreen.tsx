import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Yup from 'yup';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text } from 'react-native-paper';
import UserTextInput from '../../components/UserTextInput';
import BirthTextInput from '../../components/BirthTextInput';
import Button from '../../components/Button';
import GreetingDesign from '../../components/GreetingGraphics';
import { phoneRegExp } from '../../util/constants';
import { errorRed, mainPurple } from '../../styles/colors';
import { handleSignUp } from '../../services/httpService';
import User from '../../models/user.model';
import { StackNavigationProp } from '../../routing/types';
import { MainRoutes } from '../../routing/StackRoutes';
import UserPicker from '../../components/UserPicker';

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(10)
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  gender: Yup.string().required('Required'),
  birthdate: Yup.string().required('Required'),
});

interface Props {
  navigation: StackNavigationProp<MainRoutes.Greeting>;
}

const SignUpScreen: FC<Props> = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { navigation } = props;
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      gender: '',
      birthdate: '',
      buddy: true,
    },
    onSubmit: () => {
      signupHandler();
    },
  });

  const showErrors = (): string => {
    console.log(Object.values(errors));
    return Object.values(errors).length > 0
      ? 'Found at least one error in the form, please verify the information provided.'
      : '';
  };

  const signupHandler = () => {
    const user: User = {
      first_name: values.name,
      email: values.email,
      password: values.password,
      phone_number: values.phone,
      gender: values.gender,
      last_name: values.lastName,
      birth_date: values.birthdate,
      buddify: values.buddy,
    };
    handleSignUp(user);
    navigation.navigate(MainRoutes.LogIn);
  };

  const pageHandler = () => {
    switch (tabIndex) {
      case 0:
        return (
          <View style={styles.formSegment}>
            <View style={styles.formInput}>
              <UserTextInput
                icon="mail"
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={errors.email}
                touched={touched.email}
                value={values.email}
              />
            </View>
            <View style={styles.formInput}>
              <UserTextInput
                icon="key"
                placeholder="Enter your password"
                secureTextEntry
                autoCompleteType="password"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
                value={values.password}
              />
            </View>
          </View>
        );
      case 1:
        return (
          <View style={styles.formSegment}>
            <View style={styles.formInput}>
              <UserTextInput
                icon="user"
                placeholder="Enter your first name"
                autoCompleteType="name"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={errors.name}
                touched={touched.name}
                value={values.name}
              />
            </View>
            <View style={styles.formInput}>
              <UserTextInput
                icon="user"
                placeholder="Enter your last name"
                autoCompleteType="name"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={errors.lastName}
                touched={touched.lastName}
                value={values.lastName}
              />
            </View>
            <View style={styles.formInput}>
              <UserTextInput
                icon="phone"
                placeholder="Enter your phone number"
                autoCapitalize="none"
                keyboardType="numeric"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={errors.phone}
                touched={touched.phone}
                value={values.phone}
              />
            </View>
            <View style={styles.formInput}>
              <BirthTextInput
                error={errors.birthdate}
                touched={touched.birthdate}
                // handleChange={handleChange('birthdate')}
                icon="birthday-cake"
                onBlur={handleBlur('birthdate')}
                onChangeText={(itemValue: any) => {
                  // console.log(itemValue, rawText);
                  // console.log(values.birthdate);
                  setFieldValue('birthdate', itemValue);
                }}
                mask="99/99/99"
                placeholder="mm/dd/yy"
                value={values.birthdate}
              />
            </View>
            <View style={styles.formInput}>
              <UserPicker
                error={errors.gender}
                touched={touched.gender}
                selectedValue={values.gender}
                style={styles.picker}
                onValueChange={(itemValue: any) => {
                  setFieldValue('gender', itemValue);
                }}
                onBlur={handleBlur('gender')}
              />
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.formSegment}>
            <View style={styles.formInput}>
              <Text>
                Our community is built on top of incredible volunteers that
                want to keep their communities safe for everyone.
              </Text>
              <Text>
                By becomming a Buddy you are accepting to receive
                notifications about people in need of a helping hand. You
                will then have the option to provide help by accepting and
                meeting with the requester or decline.
              </Text>
            </View>
            <View style={[styles.genderWrapper, styles.formInput]}>
              <Picker
                style={styles.picker}
                selectedValue={values.buddy}
                onValueChange={(itemValue) => {
                  setFieldValue('buddy', itemValue);
                }}
              >
                <Picker.Item label="Yes" value />
                <Picker.Item label="No" value={false} />
              </Picker>
            </View>
            <View>
              <Button label="Sign Up" onPress={handleSubmit} />
              <Text style={styles.errorStyle}>{showErrors()}</Text>
            </View>
          </View>
        );
      default:
        break;
    }
    return <></>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingDesign}>
        <GreetingDesign />
      </View>
      <View style={styles.formWrapper}>
        <SegmentedControl
          values={['Account', 'Personal Info', 'Buddy']}
          selectedIndex={tabIndex}
          onChange={(event) => {
            setTabIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <View>{pageHandler()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    minHeight: 600,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  greetingDesign: {
    height: '30%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  formWrapper: {
    display: 'flex',
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: '8%',
    paddingVertical: '5%',
  },
  formSegment: {
    paddingVertical: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '80%',
  },
  dropInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    padding: 8,
    borderColor: mainPurple,
  },
  genderWrapper: {
    borderRadius: 8,
    borderWidth: 2,
    height: 48,
    width: '100%',
    borderColor: mainPurple,
  },
  formInput: {
    marginVertical: 10,
  },
  picker: {
    height: '100%',
    width: '100%',
  },
  errorStyle: {
    color: errorRed,
  },
});

export default SignUpScreen;
