import React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';

const GreetingDesign = () => {
  return (
    <ImageBackground
      source={require('../assets/Path21.png')}
      resizeMode='cover'
      style={styles.imageBackground}
    >
      <Image
        source={require('../assets/undraw_dreamer.png')}
        style={styles.imageHero}
      ></Image>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
});

export default GreetingDesign;
