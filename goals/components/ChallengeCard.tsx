import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import ChallengeUpload from "./ChallengeUpload";

export interface ChallengeCardProps {
  user: {
    id: string;
    name: string;
    image: string;
  };
}

type CardMode = "view" | "upload" | "verify";

const ChallengeCard = ({ user }: ChallengeCardProps) => {
  const [viewMode, setViewMode] = useState<CardMode>("view");

  const [photoData, setPhotoData] = useState(null);

  const context = {
    user: {
      id: "1",
    },
  };

  if (viewMode === "view") {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Image
            style={styles.image}
            source={{
              uri: user.image,
            }}
          />
          <View style={styles.group}>
            <Text style={styles.header}>{user.name}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          {context?.user.id.toString() === user.id.toString() && (
            <Button
              title="Done"
              onPress={() => {
                setViewMode("upload");
              }}
            />
          )}
          {context?.user.id.toString() !== user.id.toString() && (
            <Button title="Verify" onPress={() => setViewMode("verify")} />
          )}
        </View>
      </View>
    );
  }

  if (viewMode === "verify") {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.containerimg}>
            <Image
              style={styles.verifyImage}
              source={{
                uri: user.image,
              }}
            />
          </View>
        </View>
        <View style={styles.actions}>
          {context?.user.id.toString() === user.id.toString() && (
            <Button
              title="Reject"
              onPress={() => {
                setViewMode("view");
              }}
            />
          )}
          {context?.user.id.toString() !== user.id.toString() && (
            <>
              <Button title="Accept" onPress={() => setViewMode("view")} />
              <Button title="Reject" onPress={() => setViewMode("view")} />
            </>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ChallengeUpload
          setPhotoData={(data: any) => {
            setPhotoData(data);
          }}
        />
        <View style={styles.actions}>
          <Button
            title="Upload"
            onPress={() => {
              console.log("Would upload", photoData);
            }}
          />
          <Button title="Cancel" onPress={() => setViewMode("view")} />
        </View>
      </View>
    </View>
  );
};

export default ChallengeCard;

const styles = StyleSheet.create({
  containerimg: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000000",
  },
  verifyImage: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 5,
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontWeight: "bold",

    fontSize: 20,
  },
  content: {
    fontSize: 17,
  },
  actions: {
    flexDirection: "row",
    backgroundColor: "#000000",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
  group: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
    display: "flex",
    flexDirection: "column",
  },
  main: {
    paddingTop: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
});
