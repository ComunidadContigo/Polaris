import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { ReqModel } from '../models/request.model';
import Button from './Button';
import textSize from '../styles/text';

type RequestModalProps = {
  visible: boolean;
  handleShowModal: Function;
  animationType: 'none' | 'slide' | 'fade';
  transparent: boolean;
  notification?: Notifications.Notification;
};

function RequestModal({
  visible,
  handleShowModal,
  animationType,
  transparent,
  notification,
}: RequestModalProps) {
  if (notification) {
    const { title } = notification.request.content;
    const { request } = notification.request.content.data;
    return (
      <Modal
        visible={visible}
        animationType={animationType}
        transparent={transparent}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalTitle, textSize.mediumTextSize]}>
              {title}
            </Text>
            <Text style={styles.modalText}>
              {`${(request as ReqModel).stat}, ${
                (request as ReqModel).r_id
              }, ${(request as ReqModel).rq_id}, ${
                (request as ReqModel).request_meeting_point
              }, ${(request as ReqModel).request_destination}`}
            </Text>
            <View style={styles.buttonWrapper}>
              <Button
                label="Accept"
                onPress={() => {
                  handleShowModal();
                  console.log('Accepted!');
                }}
                customStyle="sideButtons"
              />
              <Button
                label="Decline"
                onPress={() => {
                  handleShowModal();
                  console.log('Declined.');
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
  return null;
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
