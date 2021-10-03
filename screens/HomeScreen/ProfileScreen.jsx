import React from 'react';
import { View, Button, SafeAreaView, StyleSheet } from 'react-native';
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
const ProfileScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Avatar.Image size={85}></Avatar.Image>
          <View>
            <Title>Name LastName</Title>
            <Caption>Username</Caption>
          </View>
          <Button title='Edit Profile' />
          <Button title='Sign Out' onPress={() => signOut()} />
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
