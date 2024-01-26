import React from "react";
import { Button, Modal, StyleSheet, View } from "react-native";

const BottomModal = ({ modalVisible, setModalVisible, children, modalHeight }: any) => {
  const modalStyle = {
    ...styles.modalView,
    height: modalHeight,
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={modalStyle}>
          {children}
          <Button
            title="Hide Modal"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "70%",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default BottomModal;
