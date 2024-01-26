import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    navigation.navigate("SetGoal");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to PayPals!</Text>

        <Image source={require("../assets/logo.png")} style={styles.imageBox} />

        <Text style={styles.subHeader}>Register</Text>
        <TextInput style={styles.input} placeholder="First Name" onChangeText={setName} value={name} />
        <TextInput style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#6042f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    paddingBottom: 40,
    color: "white",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "500",
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  imageBox: {
    width: 200,
    height: 200,
    borderWidth: 1,
  },
  registerButton: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Login;
