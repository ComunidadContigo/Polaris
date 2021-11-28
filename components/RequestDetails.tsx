import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RequestStatus } from '../models/constants/request';
import { ReqModel } from '../models/request.model';
import { cancelRequest } from '../services/Buddy';
import { mainPurple } from '../styles/colors';
import Button from './Button';
import { AuthContext, NotificationContext } from './context';

export const RequestDetails = () => {
  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  const {
    requestData,
    setActiveRequestId,
  }: {
    requestData: ReqModel | undefined;
    setActiveRequestId: any;
  } = useContext(NotificationContext);
  const [expandedRequestDetails, setExpandedRequestDetails] =
    useState<Boolean>(false);
  const toggleExpandedDetails = () => {
    setExpandedRequestDetails(!expandedRequestDetails);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => toggleExpandedDetails()}
      >
        <View>
          <Text style={styles.status}>
            {`Trip Status: ${requestData?.stat}`}
          </Text>
        </View>
        <Icon name="edit" color="#fff" size={26} />
      </TouchableOpacity>
      {expandedRequestDetails ? (
        <View style={styles.expanded}>
          <View style={styles.requestInfo}>
            {requestData?.stat === RequestStatus.UNFULFILLED ? (
              <Text>Finding you a buddy</Text>
            ) : (
              <>
                <Text>
                  Meeting Location: {requestData?.request_meeting_point}
                </Text>
                <Text>
                  Destination Location: {requestData?.request_destination}
                </Text>
              </>
            )}
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="More details"
              onPress={() => console.log('Bing Bong')}
              customStyle="borderedButton"
            />
          </View>
          <Button
            label="Cancel request"
            onPress={async () => {
              try {
                if (requestData) {
                  await cancelRequest(
                    accessToken,
                    setAccessToken,
                    uid,
                    requestData.rq_id,
                  );
                  setActiveRequestId(-1);
                  setExpandedRequestDetails(false);
                }
              } catch (e) {
                console.log(e);
              }
            }}
            customStyle="cancelButton"
          />
        </View>
      ) : (
        <></>
      )}
    </>
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
  expanded: {
    width: '100%',
    marginTop: 10,
  },
  requestInfo: {
    paddingHorizontal: '5%',
  },
  buttonWrapper: {
    margin: 10,
  },
  status: {
    color: '#fff',
  },
});
