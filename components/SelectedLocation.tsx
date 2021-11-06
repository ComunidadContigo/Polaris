import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { mainPurple } from '../styles/colors';

interface Props {
  type: string;
  location: string;
}
const SelectedLocation = (props: Props) => {
  const { location, type } = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.locationHeader}>
        <Icon name="location" size={16} />
        <Text style={styles.text}>{type}</Text>
      </View>
      <Text style={styles.locationDescription}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: '3%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 6,
    padding: 10,
  },
  locationHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: mainPurple,
    flex: 1,
    width: '100%',
    marginLeft: '5%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  locationDescription: {
    width: '100%',
  },
});

export default SelectedLocation;
