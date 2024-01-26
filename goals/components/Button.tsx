import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = (props: any) => {
  const { onPress, title } = props;
  return (
    <Pressable style={[styles.button, props.styles?.button || {}]} onPress={onPress}>
      {title && <Text style={[styles.text, props.styles?.text || {}]}>{title}</Text>}
      {props.children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    width: "100%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
