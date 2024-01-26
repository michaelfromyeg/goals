import { faBell, faCalendarCheck, faCheck, faPiggyBank, faSyncAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";

const JoinGoal = ({ route, navigation }: any) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { challengeName, deadline, buyIn } = route.params || {};

  const handleInputChange = (text: string): void => {
    setInputValue(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <FontAwesomeIcon icon={faTimes} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Would refresh...");
          }}
        >
          <FontAwesomeIcon icon={faSyncAlt} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.challengeWidget}>
        <Text style={styles.goalTitle}>{challengeName}</Text>
        <View style={styles.challengeInfo}>
          <FontAwesomeIcon icon={faPiggyBank} style={styles.iconStyle} size={24} />
          <Text>${buyIn} buy-in</Text>
        </View>
        <View style={styles.challengeInfo}>
          <FontAwesomeIcon icon={faBell} style={styles.iconStyle} size={24} />
          <Text>Daily</Text>
        </View>
        <View style={styles.challengeInfo}>
          <FontAwesomeIcon icon={faCalendarCheck} style={styles.iconStyle} size={24} />
          <Text>Until {deadline}</Text>
        </View>
      </View>
      <View style={styles.goal}>
        <View style={styles.circleFrame}>
          <Image source={require("../assets/logo.png")} style={styles.avatar} />
        </View>
        <View style={styles.divider} />
        <View style={styles.friendWidget}>
          <Text style={styles.header}>Armin's Goal</Text>
          <Text style={styles.goalTitle}>Go to the gym everyday</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.circleCheckFrame}>
          <FontAwesomeIcon icon={faCheck} size={24} color="white" />
        </View>
      </View>
      <View style={styles.goalInputColumn}>
        <View>
          <Input
            onChangeText={handleInputChange}
            value={inputValue}
            placeholder="Enter your goal"
            title="Create a goal"
          />
        </View>
        <View style={styles.button}>
          <Button title={"Submit"} onPress={() => navigation.navigate("Goal")} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JoinGoal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6042f5",
    height: "100%",
  },
  friendWidget: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    maxWidth: "70%",
  },
  challengeWidget: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  challengeInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  button: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  header: {
    fontSize: 14,
    color: "grey",
    fontWeight: "400",
  },
  goal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
  },
  goalInputColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    width: "100%",
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 8,
    flexWrap: "wrap",
  },
  iconStyle: {
    marginRight: 8,
  },
  circleFrame: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  circleCheckFrame: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  check: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 65,
    width: 65,
    borderRadius: 20,
  },
  divider: {
    height: "100%",
    backgroundColor: "black",
    width: 0.5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
