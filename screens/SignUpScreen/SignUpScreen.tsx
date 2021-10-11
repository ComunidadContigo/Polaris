import React, { useContext, FC } from 'react';
import { View, StyleSheet } from 'react-native';
import UserTextInput from '../../components/UserTextInput';
import BirthTextInput from '../../components/BirthTextInput';
import Button from '../../components/Button';
import GreetingDesign from '../../components/GreetingGraphics';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { phoneRegExp } from '../../util/constants';
import SelectDropdown from 'react-native-select-dropdown';
import { mainPurple } from '../../styles/colors';
import envs from '../../config/environment';

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
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});

interface Props {
  navigation: any;
}

const SignUpScreen = (props: Props) => {
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
      phone: null,
      password: '',
      gender: '',
      birthday: '',
      birthmonth: '',
      birthyear: '',
    },
    onSubmit: () => {
      handleSignUp();
    },
  });

  const checker = () => console.log(values);
  const genders = [
    'Male',
    'Female',
    'Non-Binary',
    'Other',
    'Prefer not to Answer',
  ];
  const handleSignUp = async () => {
    try {
      const settings = {
        method: 'POST',
        body: JSON.stringify(values),
      };
      await fetch(`${envs?.DEV_USER_SERVICE_URL}/user`, settings);
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingDesign}>
        <GreetingDesign />
      </View>
      <View style={styles.buttonWrapper}>
        <UserTextInput
          icon='user'
          placeholder='Enter your first name'
          autoCompleteType='name'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='go'
          returnKeyLabel='go'
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          error={errors.name}
          touched={touched.name}
        />
        <UserTextInput
          icon='user'
          placeholder='Enter your last name'
          autoCompleteType='name'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='go'
          returnKeyLabel='go'
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          error={errors.lastName}
          touched={touched.lastName}
        />
        <UserTextInput
          icon='mail'
          placeholder='Enter your email'
          autoCapitalize='none'
          autoCompleteType='email'
          keyboardType='email-address'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
          touched={touched.email}
        />
        <UserTextInput
          icon='phone'
          placeholder='Enter your phone number'
          autoCapitalize='none'
          keyboardType='numeric'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          onChangeText={handleChange('phone')}
          onBlur={handleBlur('phone')}
          error={errors.phone}
          touched={touched.phone}
        />
        <UserTextInput
          icon='key'
          placeholder='Enter your password'
          secureTextEntry
          autoCompleteType='password'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='go'
          returnKeyLabel='go'
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          touched={touched.password}
        />

        <BirthTextInput
          handleChange={handleChange}
          icon='birthday-cake'
          autoCapitalize='none'
          keyboardType='numeric'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          //onChangeText={handleChange('birthdate')}
          onBlur={handleBlur('birthdate')}
          //error={errors.birthdate}
          //touched={touched.birthdate}
        />

        <SelectDropdown
          rowStyle={styles.birthbuttonWrapper}
          rowTextStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownWrapper}
          buttonStyle={styles.dropInput}
          buttonTextStyle={styles.dropbuttonText}
          defaultButtonText='Enter Gender'
          data={genders}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        <Button label='Sign Up' onPress={handleSubmit} />
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
