import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import UserTextInput from '../../components/UserTextInput';
import BirthTextInput from '../../components/BirthTextInput';
import Button from '../../components/Button';
import GreetingDesign from '../../components/GreetingGraphics';
import {
  phoneRegExp,
  birthDayExp,
  birthMonthExp,
  birthYearExp,
} from '../../util/constants';
import { mainPurple } from '../../styles/colors';
import { handleSignUp } from '../../services/httpService';
import User from '../../models/user.model';
import { StackNavigationProp } from '../../routing/types';
import { MainRoutes } from '../../routing/StackRoutes';

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
  birthday: Yup.string().matches(birthDayExp).required('Required'),
  birthmonth: Yup.string().matches(birthMonthExp).required('Required'),
  birthyear: Yup.string().matches(birthYearExp).required('Required'),
});

interface Props {
  navigation: StackNavigationProp<MainRoutes.Greeting>;
}

const SignUpScreen: FC<Props> = (props: Props) => {
  const { navigation } = props;
  const {
    handleChange,
    handleSubmit,
    handleBlur,
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
      birthday: '',
      birthmonth: '',
      birthyear: '',
    },
    onSubmit: () => {
      signupHandler();
    },
  });

  const genders = [
    'Male',
    'Female',
    'Non-Binary',
    'Other',
    'Prefer not to Answer',
  ];
  const signupHandler = () => {
    const user: User = {
      first_name: values.name,
      email: values.email,
      password: values.password,
      phone_number: values.phone,
      gender: values.gender,
      last_name: values.lastName,
      birth_date: new Date(
        // eslint-disable-next-line prefer-template
        values.birthday + '/' + values.birthmonth + '/' + values.birthyear,
      ),
    };
    console.log(user);
    handleSignUp(user);
    navigation.navigate(MainRoutes.LogIn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingDesign}>
        <GreetingDesign />
      </View>
      <View style={styles.buttonWrapper}>
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
        />
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
        />
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
        />
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
        />
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
        />

        <BirthTextInput
          handleChange={handleChange}
          icon="birthday-cake"
          autoCapitalize="none"
          keyboardType="numeric"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onBlur={handleBlur('birthdate')}
          errors={[errors.birthday, errors.birthmonth, errors.birthyear]}
          touched={
            touched.birthday || touched.birthmonth || touched.birthyear
          }
        />

        <SelectDropdown
          rowStyle={styles.birthbuttonWrapper}
          rowTextStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownWrapper}
          buttonStyle={styles.dropInput}
          buttonTextStyle={styles.dropbuttonText}
          defaultButtonText="Enter Gender"
          data={genders}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem) => selectedItem}
          rowTextForSelection={(item) => item}
        />
        <Button label="Sign Up" onPress={handleSubmit} />
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
  buttonWrapper: {
    flex: 1,
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: '8%',
    paddingBottom: '5%',
  },
  birthbuttonWrapper: {
    flex: 1,
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: '8%',
    paddingBottom: '5%',
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
  dropbuttonText: {
    fontSize: 14,
    alignItems: 'center',
  },
  dropdownText: {
    alignItems: 'flex-start',
  },

  dropdownWrapper: {
    height: 210,
  },
});

export default SignUpScreen;
