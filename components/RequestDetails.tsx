import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { mainPurple } from '../styles/colors';

export const RequestDetails = () => {
  const [requestStatus] = useState('Unfulfilled');
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.status}>
          {`Trip Status: ${requestStatus}`}
        </Text>
      </View>
      <Icon name="edit" color="#fff" size={26} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 44,
    backgroundColor: mainPurple,
    borderRadius: 8,
    paddingHorizontal: '5%',
  },
  status: {
    color: '#fff',
  },
});
