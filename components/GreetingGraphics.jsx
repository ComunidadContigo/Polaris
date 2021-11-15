import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';


const designPath = require('../assets/Path21.png');
const ladyGraphic = require('../assets/undraw_dreamer.png');

const windowWidth = Dimensions.get('window').width;

const GreetingDesign = () => (
  <ImageBackground
    source={designPath}
    resizeMode="cover"
    style={styles.imageBackground}
  >
    <Image source={ladyGraphic} style={styles.imageHero} />
  </ImageBackground>
);

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageHero: {
    width: windowWidth - 240,
    height: windowWidth - 240,
    right: 50,
    top: 50,
  },
});

export default GreetingDesign;
