import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../../styles/colors';
import text from '../../styles/text';
import Button from '../../components/Button';
import GreetingGraphics from '../../components/GreetingGraphics';

const GreetingScreen = ({ navigation }) => {
  const navigateToLogIn = () => {
    navigation.navigate('SignIn');
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.greetingDesign}>
          <GreetingGraphics />
        </View>
        <View style={styles.heroTitleSection}>
          <Text style={text.bigTextSize}>Contigo Community</Text>
          <Text
            style={[text.mediumTextSize, colors.lightBackground.subtitle]}
          >
            Arrive safely everytime.
          </Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button label='LogIn' onPress={navigateToLogIn} />
        <Button label='SignUp' onPress={navigateToSignUp} />
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    minHeight: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingDesign: {
    height: '70%',
    width: '100%',
    justifyContent: 'flex-end',
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
  heroTitleSection: {
    paddingHorizontal: '8%',
  },
});

export default GreetingScreen;
