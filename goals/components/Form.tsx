import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

interface FormProps {
  title: string;
  inputs: JSX.Element[];
  onSubmit: () => void;
}

const Form = ({ title, inputs, onSubmit }: FormProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{title}</Text>
      {inputs.map((input, index) => (
        <View key={index} style={styles.inputContainer}>
          {input}
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 4,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 25,
  },
});
