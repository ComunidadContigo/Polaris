// eslint-disable-next-line no-use-before-define
import React, { useContext, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { AuthContext } from '../../components/context';
import Button from '../../components/Button';
// import { getUserById } from '../../services/httpService';
import HttpResponse from '../../models/response.model';
import { siriusFetch } from '../../services/httpService';
import envs from '../../config/environment';
import { mainPurple } from '../../styles/colors';

const ProfileScreen = () => {
  // const navigateToEditProfile = () => {
  //   navigation.navigate('EditProfile');
  // };
  const [name, setname] = useState('jon');
  const [lastname, setlastname] = useState('doe');
  const [email, setemail] = useState('place@holder.com');
  const [phone, setphone] = useState('000000000');
  const [birth, setbirth] = useState('00/00/0000');
  const [status, setstatus] = useState('In Review');
  const [vetting, setvetting] = useState('');
  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  // eslint-disable-next-line max-len
  function isHttpResponse(dt: void | HttpResponse): dt is HttpResponse {
    return (dt as HttpResponse).data !== undefined;
  }
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
      if (res.data.is_vetted) {
        setvetting('Buddy | Requester ');
      }
    }
    return res;
  };
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
              <TouchableOpacity
                onPress={() => console.log('Navigate to Edit Profile')}
              >
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
        <View style={styles.profileInfo}>
          <View>
            <Text>Status:</Text>
            <Text>Email:</Text>
            <Text>Phone number:</Text>
            <Text>Birthdate:</Text>
          </View>
          <View style={styles.profileInfoPadding}>
            <Text>{status}</Text>
            <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} />
            <Text>{email}</Text>
            <Text>
              {phone.substring(0, 3)}-{phone.substring(3, 6)}-
              {phone.substring(6)}
            </Text>
            <Text>
              {birth.substring(0, 4)}/{birth.substring(5, 7)}/
              {birth.substring(8, 10)}
            </Text>
          </View>
        </View>
        <Button
          onPress={() => getUserById(uid)}
          label="Get Profile Info"
        />
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
  name: {
    color: mainPurple,
    fontSize: 50,
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
  profileInfo: {
    paddingTop: '20%',
    paddingLeft: '10%',
    flexDirection: 'row',
  },
  profileInfoPadding: {
    paddingLeft: '25%',
  },
  userInfo: {
    paddingHorizontal: 20,
    paddingTop: 25,
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

export default ProfileScreen;
