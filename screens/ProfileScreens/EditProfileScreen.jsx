import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
//import { AuthContext } from '../../components/context';
import { useContext } from 'react';
import colors from '../../styles/colors';
import text from '../../styles/text';
import buttons from '../../styles/buttons';
import { Avatar } from 'react-native-paper';

const EditProfileScreen = ({}) => {
  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={[]}
            style={[buttons.button]}
            accessibilityLabel='Cancel'
          >
            <Text
              style={[text.smallTextSize, colors.lightBackground.text]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[text.smallTextSize, colors.lightBackground.text]}>
          Edit Profile
        </Text>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={[]}
            style={[buttons.button]}
            accessibilityLabel='Done'
          >
            <Text
              style={[text.smallTextSize, colors.lightBackground.text]}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.container2]}>
        <Avatar.Image size={85}></Avatar.Image>
        <Text>Change Profile Picture?</Text>
        <Text>Name</Text>
        <Text>Username</Text>
        <Text>Password</Text>
        <Text>OTher Stuff</Text>
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  container2: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    width: '40%',
  },
});

export default EditProfileScreen;
