import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthContext } from '../../components/context';
import http from '../../services/httpService';
import GreetingGraphics from '../../components/GreetingGraphics';
import Button from '../../components/Button';
import UserTextSigninInput from '../../components/UserTextSignInInput';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});
const SignInScreen = () => {
  const { signIn } = useContext(AuthContext);
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      console.log('Signin in');
      http.handleSignIn(values.email);
      signIn(values.email, values.password);
    },
  });

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.greetingDesign}>
        <GreetingGraphics />
      </View>

      <UserTextSigninInput
        placeholder="Email"
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        touched={touched.email}
      />
      <UserTextSigninInput
        placeholder="Password"
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        error={errors.password}
        touched={touched.password}
      />
      <View style={styles.buttonWrapper}>
        <Button onPress={handleSubmit} label="LogIn" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 3,
    borderColor: 'transparent',
    padding: 4,
    margin: 10,
    width: 300,
  },
  buttonWrapper: {
    flex: 1,
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: '8%',
    paddingBottom: '5%',
  },
  greetingDesign: {
    height: '70%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  imageDesign: {
    height: '70%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  heroTitleSection: {
    paddingHorizontal: '8%',
  },
});

export default SignInScreen;
