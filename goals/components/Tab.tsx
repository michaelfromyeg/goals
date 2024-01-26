import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

interface TabProps {
  title: string;
  children: React.ReactNode;
  styles: any;
}

const Tab: React.FC<TabProps> = ({ title, children, styles }) => {
  return (
    <SafeAreaView style={[defaultStyles.container, styles.container]}>
      <Text style={[defaultStyles.title, styles.title]}>{title}</Text>
      {children}
    </SafeAreaView>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    paddingTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 40,
  },
});

export default Tab;
