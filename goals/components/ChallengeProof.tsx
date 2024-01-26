import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ChallengeProof = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} />
      </View>
    </View>
  );
};

export default ChallengeProof;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },

  circular: {
    borderRadius: 50,
    minWidth: 60,
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    borderWidth: 4,
    borderColor: "#ffffff",
    padding: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
