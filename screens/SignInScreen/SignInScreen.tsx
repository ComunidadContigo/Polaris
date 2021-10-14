import React, { useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthContext } from '../../components/context';
import GreetingGraphics from '../../components/GreetingGraphics';
import Button from '../../components/Button';
import envs from '../../config/environment';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});

const SignInScreen = () => {
  const { handleChange, handleSubmit, handleBlur, values } = useFormik({
    validationSchema: SignInSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      handleSignIn();
    },
  });

  const handleSignIn = async () => {
    try {
      const settings = {
        method: 'POST',
        body: JSON.stringify(values),
      };
      await fetch(`${envs?.DEV_USER_SERVICE_URL}/user`, settings);
      // find Route for Sign In
    } catch (e) {
      console.log(e);
    } finally {
      useContext(AuthContext);
    }
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.greetingDesign}>
        <GreetingGraphics />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
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
    borderBottomColor: 'purple',
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
