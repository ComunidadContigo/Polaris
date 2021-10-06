import React from 'react';
import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';
import { useContext } from 'react';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import colors from '../../styles/colors';
import text from '../../styles/text';
import buttons from '../../styles/buttons';
import EditProfile from './Edit Profile/EditProfileScreen';

const ProfileScreen = ({ navigation }) => {
  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
    console.log('You pressed Edit');
  };

  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Avatar.Image size={85}></Avatar.Image>
          <View>
            <Title>Name LastName</Title>
            <Caption>Username</Caption>
            <Caption>Verified</Caption>
          </View>
        </View>
        <View style={styles.editButtons}>
          <TouchableOpacity
            onPress={navigateToEditProfile}
            style={[buttons.button, colors.mainColors.background]}
            accessibilityLabel='Edit Profile'
          >
            <Text style={[text.mediumTextSize, colors.mainColors.text]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signOut()}
            style={[buttons.button, colors.lightBackground.background]}
            accessibilityLabel='Sign Out button'
          >
            <Text
              style={[text.mediumTextSize, colors.lightBackground.text]}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
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
  editButtons: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '45%',
    justifyContent: 'flex-start',
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
