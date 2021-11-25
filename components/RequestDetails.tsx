import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ReqModel } from '../models/request.model';
import { mainPurple } from '../styles/colors';
import { NotificationContext } from './context';

export const RequestDetails = () => {
  const {
    requestData,
  }: {
    requestData: ReqModel | undefined;
  } = useContext(NotificationContext);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.status}>
          {`Trip Status: ${requestData?.stat}`}
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
