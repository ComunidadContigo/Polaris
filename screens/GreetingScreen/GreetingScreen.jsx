import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../../styles/colors';
import text from '../../styles/text';
import buttons from '../../styles/buttons';

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
          <ImageBackground
            source={require('../../assets/Path21.png')}
            resizeMode='cover'
            style={styles.imageBackground}
          >
            <Image
              source={require('../../assets/undraw_dreamer.png')}
              style={styles.imageHero}
            ></Image>
          </ImageBackground>
        </View>
        <View style={styles.heroTitleSection}>
          <Text>Contigo Community</Text>
          <Text>Arrive safely everytime.</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={navigateToLogIn}
          style={[buttons.button, colors.mainColors.background]}
          accessibilityLabel='LogIn button'
        >
          <Text style={[text.normalTextSize, colors.mainColors.text]}>
            Log in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToSignUp}
          style={buttons.borderedButton}
          accessibilityLabel='SignUp button'
        >
          <Text style={[text.normalTextSize, colors.greyBackground.text]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
  imageBackground: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageHero: {
    width: 150,
    height: 150,
    right: 50,
    top: 50,
  },
  heroTitleSection: {
    paddingHorizontal: '8%',
  },
});

export default GreetingScreen;
