import { NavigationProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Form from "./Form";
import Input from "./Input";

interface NewChallengeProps {
  navigation: NavigationProp<any>;
  onClose: () => void;
}

const JoinChallenge = ({ navigation, onClose }: NewChallengeProps) => {
  const [inviteLink, setInviteLink] = useState("");

  const handleSubmit = async () => {
    navigation.navigate("JoinGoal");
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Form
          title="Join a challenge"
          inputs={[
            <Input
              title="Challenge Name"
              value={inviteLink}
              onChangeText={setInviteLink}
              placeholder="Enter invite link"
              validator={value => (value ? null : "This field is required")}
            />,
          ]}
          onSubmit={handleSubmit}
        />
      </View>
    </View>
  );
};

export default JoinChallenge;

const styles = StyleSheet.create({
  border: {
    width: "100%",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 0,
    paddingHorizontal: 8,
    width: "100%",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});
