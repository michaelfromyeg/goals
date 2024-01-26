import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BottomModal from "../components/BottomModal";
import JoinChallenge from "../components/JoinChallenge";
import NewChallenge from "../components/NewChallenge";

const SetGoal = ({ navigation }: any) => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [joinModalVisibile, setJoinModalVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome Olti</Text>
        <TouchableOpacity style={styles.actionWidget} onPress={() => setCreateModalVisible(true)}>
          <Text style={styles.widgetHeader}>Create a Challenge</Text>
          <Text style={styles.widgetText}>
            Embark on your personal goal-setting journey by creating a new challenge.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionWidget} onPress={() => setJoinModalVisible(true)}>
          <Text style={styles.widgetHeader}>Join a Challenge</Text>
          <Text style={styles.widgetText}>
            Connect with others and achieve together by joining an existing challenge.
          </Text>
        </TouchableOpacity>
        <BottomModal modalVisible={createModalVisible} setModalVisible={setCreateModalVisible} modalHeight={"70%"}>
          <NewChallenge navigation={navigation} onClose={() => setCreateModalVisible(false)} />
        </BottomModal>
        <BottomModal modalVisible={joinModalVisibile} setModalVisible={setJoinModalVisible} modalHeight={"40%"}>
          <JoinChallenge
            navigation={navigation}
            onClose={() => {
              setJoinModalVisible(false);
            }}
          />
        </BottomModal>
      </View>
    </SafeAreaView>
  );
};

export default SetGoal;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#6042f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#6042f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  actionWidget: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 150,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 20,
    padding: 20,
  },

  widgetHeader: {
    fontSize: 24,
    justifyContent: "center",
    fontWeight: "600",
    textAlign: "left",

    marginBottom: 10,
  },
  widgetText: {
    fontSize: 16,
    textAlign: "left",
    color: "#6C757D",
  },
});
