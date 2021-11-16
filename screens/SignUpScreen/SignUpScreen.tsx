import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Yup from 'yup';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import UserTextInput from '../../components/UserTextInput';
import BirthTextInput from '../../components/BirthTextInput';
import Button from '../../components/Button';
import GreetingDesign from '../../components/GreetingGraphics';
import {
  phoneRegExp,
  // birthDayExp,
  // birthMonthExp,
  // birthYearExp,
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
  birthdate: Yup.string().required('Required'),
});

interface Props {
  navigation: StackNavigationProp<MainRoutes.Greeting>;
}

const SignUpScreen: FC<Props> = (props: Props) => {
  const [selectedGender, setSelectedGender] = useState();
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
    },
    onSubmit: () => {
      signupHandler();
    },
  });

  const signupHandler = () => {
    const user: User = {
      first_name: values.name,
      email: values.email,
      password: values.password,
      phone_number: values.phone,
      gender: values.gender,
      last_name: values.lastName,
      birth_date: values.birthdate,
    };
    handleSignUp(user);
    console.log(user);
    navigation.navigate(MainRoutes.LogIn);
  };

  const pageHandler = () => {
    switch (tabIndex) {
      case 0:
        return (
          <View>
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
          </View>
        );
      case 1:
        return (
          <View>
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
          </View>
        );
      case 2:
        return (
          <>
            <View>
              <BirthTextInput
                handleChange={handleChange}
                icon="birthday-cake"
                onBlur={handleBlur('birthdate')}
                formValues={values}
                setFieldValue={setFieldValue}
                errors={[]}
                touched={touched.birthdate}
              />
            </View>
            <View style={styles.genderWrapper}>
              <Picker
                style={styles.picker}
                selectedValue={selectedGender}
                onValueChange={(itemValue) => {
                  setSelectedGender(itemValue);
                  setFieldValue('gender', itemValue);
                }}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Non-Binary" value="non" />
                <Picker.Item label="Other" value="other" />
                <Picker.Item
                  label="Prefer not to answer"
                  value="noanswer"
                />
              </Picker>
            </View>
            <Button label="Sign Up" onPress={handleSubmit} />
          </>
        );
      default:
        console.log('No such page exists!');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingDesign}>
        <GreetingDesign />
      </View>
      <View style={styles.buttonWrapper}>
        <SegmentedControl
          values={['Name', 'Login', 'Additional']}
          selectedIndex={tabIndex}
          onChange={(event) => {
            setTabIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <View>{pageHandler()}</View>
        {/* <UserTextInput
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
        /> */}
        {/* <UserTextInput
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
        /> */}

        {/* <View>
          <Button
            onPress={showDatePicker}
            label="Please input your birthdate"
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View> */}
        {/* <BirthTextInput
          handleChange={handleChange}
          icon="birthday-cake"
          onBlur={handleBlur('birthdate')}
          formValues={values}
          setFieldValue={setFieldValue}
          errors={[]}
          touched={touched.birthdate}
        />
        <View style={styles.genderWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={selectedGender}
            onValueChange={(itemValue) => {
              setSelectedGender(itemValue);
              setFieldValue('gender', itemValue);
            }}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Non-Binary" value="non" />
            <Picker.Item label="Other" value="other" />
            <Picker.Item label="Prefer not to answer" value="noanswer" />
          </Picker>
        </View> */}

        {/* <SelectDropdown
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
        /> */}
        {/* <Button label="Sign Up" onPress={handleSubmit} /> */}
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

  genderWrapper: {
    borderRadius: 8,
    borderWidth: 2,
    height: 48,
    width: '100%',
    borderColor: mainPurple,
  },

  picker: {
    height: '100%',
    width: '100%',
  },
});

export default SignUpScreen;
