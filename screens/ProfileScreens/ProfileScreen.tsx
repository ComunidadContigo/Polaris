// eslint-disable-next-line no-use-before-define
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../components/context';
import HttpResponse from '../../models/response.model';
import { siriusFetch } from '../../services/httpService';
import envs from '../../config/environment';
import { mainPurple } from '../../styles/colors';
import UserTextInput from '../../components/UserTextInput';
import { phoneRegExp } from '../../util/constants';

const EditProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(10),
});
const ProfileScreen = () => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: EditProfileSchema,
    initialValues: {
      email: '',
      phone: '',
    },
    onSubmit: () => {
      // handle edit
      console.log(values);
      editUserbyId();
    },
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);
  const [name, setname] = useState('jon');
  const [lastname, setlastname] = useState('doe');
  const [email, setemail] = useState('place@holder.com');
  const [phone, setphone] = useState('000000000');
  const [birth, setbirth] = useState('00/00/0000');
  const [status, setstatus] = useState('In Review');
  const [vetting, setvetting] = useState('');
  const [editstatus, seteditstatus] = useState(false);
  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  // eslint-disable-next-line max-len
  function isHttpResponse(dt: void | HttpResponse): dt is HttpResponse {
    return (dt as HttpResponse).data !== undefined;
  }
  const editUserbyId = async () => {
    const endpoint = `${envs?.DEV_USER_SERVICE_URL}/${uid}`;
    const settings = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        phone_number: values.phone !== '' ? values.phone : phone,
        email: values.email !== '' ? values.email : email,
      }),
    };
    console.log(settings.body);
    try {
      const res = await siriusFetch(
        accessToken,
        setAccessToken,
        uid,
        endpoint,
        settings,
      );
      seteditstatus(!editstatus);
      getUserById(uid);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const getUserById = async (id: number): Promise<void | HttpResponse> => {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      `${envs?.DEV_USER_SERVICE_URL}/${id}`,
    );
    console.log(res);
    if (isHttpResponse(res)) {
      console.log('logging data');
      setname(res.data.first_name);
      setlastname(res.data.last_name);
      setemail(res.data.email);
      setphone(res.data.phone_number);
      setbirth(res.data.birth_date);
    }
    return res;
  };
  const getUserVetting = async (
    id: number,
  ): Promise<void | HttpResponse> => {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      `${envs?.DEV_USER_SERVICE_URL}/${id}`,
    );
    console.log(res);
    if (isHttpResponse(res)) {
      console.log('logging data');
      if (res.data.is_vetted) {
        setstatus('Vetted');
        setvetting('Buddy | Requester ');
      }
    }
    return res;
  };
  useEffect(() => {
    getUserById(uid);
    getUserVetting(uid);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.profileHeader}>
          <View style={styles.headerTop}>
            <Avatar.Image
              source={{
                uri: 'https://randomuser.me/api/portraits/lego/1.jpg',
              }}
              size={85}
            />
            <View style={{ paddingLeft: '50%' }}>
              <TouchableOpacity onPress={() => setAccessToken('')}>
                <Text style={styles.topbutton}>Signout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => seteditstatus(!editstatus)}>
                <Text>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.name}>
              {name} {lastname}
            </Text>
            <Text>{vetting}</Text>
          </View>
        </View>
        {!editstatus ? (
          <View style={styles.profileInfo}>
            <View>
              <View style={styles.profileInfo2}>
                <Text style={{ fontSize: 21, paddingTop: '5%' }}>
                  Status:
                </Text>
                {status !== 'In Review' ? (
                  <Switch
                    trackColor={{ false: '#767577', true: mainPurple }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ paddingLeft: '23%' }}
                  />
                ) : (
                  <Text style={styles.textinfo}>{status}</Text>
                )}
              </View>
              <View style={styles.profileInfo2}>
                <Text style={styles.textinfo}>Email:</Text>

                <Text style={styles.textinfo}>{email}</Text>
              </View>
              <View style={styles.profileInfo2}>
                <Text style={styles.textinfo}>Phone:</Text>
                <Text style={styles.textinfo}>
                  {phone.substring(0, 3)}-{phone.substring(3, 6)}-
                  {phone.substring(6)}
                </Text>
              </View>
              <View style={styles.profileInfo2}>
                <Text style={styles.textinfo}>Birthdate:</Text>
                <Text style={styles.textinfo}>
                  {birth.substring(0, 4)}/{birth.substring(5, 7)}/
                  {birth.substring(8, 10)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.buttonWrapper}>
            <View style={styles.editProfileButtons}>
              <TouchableOpacity onPress={() => seteditstatus(!editstatus)}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'grey',
                    paddingRight: '2%',
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingLeft: '15%',
                  paddingRight: '15%',
                  paddingBottom: '5%',
                }}
              >
                Edit Profile
              </Text>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text
                  style={{
                    fontSize: 20,
                    color: mainPurple,
                    paddingLeft: '2%',
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: '5%' }}>
              <UserTextInput
                icon="mail"
                placeholder="Enter your new email"
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
            </View>
            <View style={{ paddingBottom: '5%' }}>
              <UserTextInput
                icon="phone"
                placeholder="Enter your new phone number"
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
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  profileInfo2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  name: {
    color: mainPurple,
    fontSize: 50,
  },
  textinfo: {
    fontSize: 20,
  },
  editButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '45%',
    justifyContent: 'flex-start',
  },
  profileHeader: {
    paddingHorizontal: '8%',
  },
  topbutton: {
    paddingLeft: '5%',
    paddingRight: '5%',
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 2,
    borderColor: 'grey',
  },
  headerTop: {
    flexDirection: 'row',
    paddingTop: '10%',
  },
  editProfileButtons: {
    flexDirection: 'row',
  },
  profileInfo: {
    paddingTop: '20%',
    paddingLeft: '10%',
  },
  profileInfoPadding: {
    paddingLeft: '25%',
  },
  userInfo: {
    paddingTop: 25,
  },
  buttonWrapper: {
    paddingTop: '20%',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
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

export default ProfileScreen;
