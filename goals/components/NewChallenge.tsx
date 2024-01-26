import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Form from "./Form";
import Input from "./Input";

interface NewChallengeProps {
  navigation: NavigationProp<any>;
  onClose: () => void;
}

const NewChallenge = ({ navigation, onClose }: NewChallengeProps) => {
  const [challengeName, setChallengeName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [buyIn, setBuyIn] = useState("");

  const handleSubmit = async () => {
    console.log("Challenge Name", challengeName);
    console.log("Deadline", deadline);
    console.log("Buy-in", buyIn);

    onClose();
    navigation.navigate("JoinGoal", { challengeName, deadline, buyIn });
  };

  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Form
          title="New Challenge"
          inputs={[
            <Input
              title="Challenge Name"
              value={challengeName}
              onChangeText={setChallengeName}
              placeholder="Enter challenge name"
              validator={value => (value ? null : "This field is required")}
            />,
            <Input
              title="Deadline"
              value={deadline}
              onChangeText={setDeadline}
              placeholder="Enter deadline"
              type="date"
              validator={value => (value ? null : "This field is required")}
            />,
            <Input
              title="Buy-in Amount"
              value={buyIn}
              onChangeText={setBuyIn}
              placeholder="Enter buy-in amount"
              type="numeric"
              validator={value => (value ? null : "This field is required")}
            />,
          ]}
          onSubmit={handleSubmit}
        />
        <StatusBar />
      </View>
    </View>
  );
};

export default NewChallenge;

const styles = StyleSheet.create({
  border: {
    width: "100%",
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
