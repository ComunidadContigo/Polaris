// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { AuthContext } from '../../components/context';
import Button from '../../components/Button';

const ProfileScreen = () => {
  // const navigateToEditProfile = () => {
  //   navigation.navigate('EditProfile');
  // };

  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Avatar.Image
            source={{
              uri: 'https://randomuser.me/api/portraits/lego/1.jpg',
            }}
            size={85}
          />
          <View>
            <Title>Name LastName</Title>
            <Caption>Username</Caption>
            <Caption>Verified</Caption>
          </View>
        </View>
        <View style={styles.editButtons}>
          <Button
            onPress={() => console.log('Navigate to Edit Profile')}
            label="Edit Profile"
          />
          <Button onPress={signOut} label="Sign Out" />
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