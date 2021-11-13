import React, { useContext, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthContext } from '../../components/context';
import GreetingGraphics from '../../components/GreetingGraphics';
import Button from '../../components/Button';
import UserTextInput from '../../components/UserTextInput';
import Login from '../../models/login.model';
import { handleSignIn } from '../../services/httpService';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});
const SignInScreen = () => {
  const { accessToken, setAccessToken, setUid } = useContext(AuthContext);
  const usernameRef = useRef<HTMLInputElement>();
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
    onSubmit: async () => {
      console.log('Signin in');
      const login: Login = {
        email: values.email,
        password: values.password,
      };
      await handleSignIn(accessToken, setAccessToken, setUid, login);
    },
  });

  useEffect(() => {
    setTimeout(() => usernameRef?.current?.focus(), 100);
  }, []);

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.greetingDesign}>
        <GreetingGraphics />
      </View>
      <View style={styles.formWrapper}>
        <View style={styles.inputWrapper}>
          <UserTextInput
            icon="user"
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            returnKeyType="next"
            ref={usernameRef}
          />
          <UserTextInput
            secureTextEntry
            icon="key"
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            returnKeyType="next"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={handleSubmit} label="LogIn" />
        </View>
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
  formWrapper: {
    flex: 1,
    height: '55%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '8%',
    paddingBottom: '5%',
  },
  inputWrapper: {
    flex: 1,
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    height: '50%',
  },
  greetingDesign: {
    height: '45%',
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
