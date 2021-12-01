import React, { useContext } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
// import * as Notifications from 'expo-notifications';
import { ReqModel } from '../models/request.model';
import Button from './Button';
import textSize from '../styles/text';
import { acceptRequest } from '../services/Buddy';
import { AuthContext, NotificationContext } from './context';

type RequestModalProps = {
  visible: boolean;
  handleShowModal: Function;
  animationType: 'none' | 'slide' | 'fade';
  transparent: boolean;
  notification?: ReqModel;
  onAccept: any;
  // onDecline: any;
};

function RequestModal({
  visible,
  handleShowModal,
  animationType,
  transparent,
  notification,
  onAccept,
  // onDecline,
}: RequestModalProps) {
  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  const { setActiveRequestId } = useContext(NotificationContext);

  const handleAccept = async (requestId: number | undefined) => {
    console.log('Accepted!');
    handleShowModal();
    if (requestId) {
      try {
        await acceptRequest(accessToken, setAccessToken, uid, requestId);
        onAccept();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDecline = () => {
    console.log('Declined!');
    setActiveRequestId(-1);
  };

  if (notification) {
    // const { title } = notification.data.request.content;
    // const { request } = notification.data.request.content.data;
    return (
      <Modal
        visible={visible}
        animationType={animationType}
        transparent={transparent}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalTitle, textSize.mediumTextSize]}>
              Someone could use a Buddy
            </Text>
            <Text style={styles.modalText}>
              {`${notification?.stat}, ${
                notification?.r_id
              }, ${notification?.rq_id}, ${
                notification?.request_meeting_point
              }, ${notification?.request_destination}`}
            </Text>
            <View style={styles.buttonWrapper}>
              <Button
                label="Accept"
                onPress={() => {
                  handleAccept(notification.rq_id);
                }}
                customStyle="sideButtons"
              />
              <Button
                label="Decline"
                onPress={() => {
                  handleShowModal();
                  handleDecline();
                }}
                customStyle="sideButtons"
              />
            </View>
            <View>
              <Button
                label="View details"
                onPress={() => console.log('More details.')}
                customStyle="plainButton"
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return <></>;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RequestModal;
