import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthContext } from '../../components/context';
import GreetingGraphics from '../../components/GreetingGraphics';
import Button from '../../components/Button';
import UserTextInput from '../../components/UserTextInput';
import Login from '../../models/login.model';
import envs from '../../config/environment';
import HttpResponse from '../../models/response.model';
import { storeToken, getAccessToken } from '../../services/tokenService';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});
const SignInScreen = () => {
  const { accessToken, setAccessToken, setUid } = useContext(AuthContext);
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
      await handleSignIn(login);
    },
  });
  const handleSignIn = async (
    login: Login,
  ): Promise<string | undefined> => {
    const settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(login),
    };
    try {
      const response = await fetch(
        `${envs?.DEV_AUTH_SERVICE_URL}/login`,
        settings,
      );
      const res: HttpResponse = await response.json();
      if (res.success) {
        // Store refresh token in local storage
        storeToken(res?.data?.token);
        // Set uid in context for use during access token refresh
        setUid(res?.data?.u_id);
        // Get access token from the refresh token
        try {
          setAccessToken(await getAccessToken(res?.data));
        } catch (e) {
          console.log([e, 'Error setting access token.']);
        }
      } else {
        setAccessToken('');
        console.log(res.errors);
      }
    } catch (e) {
      console.log(e);
    }
    return accessToken;
  };
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.greetingDesign}>
        <GreetingGraphics />
      </View>
      <View style={styles.buttonWrapper}>
        <UserTextInput
          icon="user"
          placeholder="Email"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
          touched={touched.email}
        />
        <UserTextInput
          icon="mail"
          placeholder="Password"
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          touched={touched.password}
        />
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
