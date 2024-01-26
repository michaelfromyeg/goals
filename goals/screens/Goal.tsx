import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import ChallengeCard from "../components/ChallengeCard";
import Tab from "../components/Tab";
import { MOCK } from "../util/mock";
import { Challenge, DayLog } from "../util/types";

const Goal = () => {
  const [users, setUsers] = useState<any[] | null>(null);
  const [userIndex, setUserIndex] = useState(0);
  const [nextUserIndex, setNextUserIndex] = useState(1);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const getChallenge = async () => {
    setChallenge(MOCK.challenge);
  };

  const getDayLogs = async () => {
    setDayLogs(MOCK.days);
  };

  useEffect(() => {
    const setup = async () => {
      await getDayLogs();
      await getChallenge();
    };

    setup();
  }, []);

  useEffect(() => {
    const makeUserChallenge = (cusers: any) => {
      const todayLog = dayLogs[dayLogs.length - 1];

      const augmentedUsers = cusers.map((user: any) => {
        return {
          ...user,
          ...todayLog?.users[user.id],
          goal: "Run 5km",
        };
      });

      return augmentedUsers;
    };

    const getUsers = async () => {
      const getppl = makeUserChallenge(MOCK.users);
      setUsers(getppl);
    };

    getUsers();
  }, [dayLogs]);

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setUserIndex(nextUserIndex);
      setNextUserIndex((nextUserIndex + 1) % (users || []).length);
      flipAnim.setValue(0);
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50 || gestureState.dx < -50) {
        flipCard();
      }
    },
  });

  if (!challenge || !users || !dayLogs) {
    return null;
  }

  const calculateProgress = (): string => {
    if (dayLogs.length === 0) {
      return "0.00";
    }

    if (!challenge) {
      return "0.00";
    }

    const startDate = dayLogs[0].day;
    const today = dayLogs[dayLogs.length - 1].day;
    const totalDays = Math.floor((challenge.deadline.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1);
    const done = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1);

    return ((done / totalDays) * 100).toFixed(2);
  };

  return (
    <Tab title={challenge.name} styles={styles}>
      <View style={styles.main}>
        <Animated.View {...panResponder.panHandlers} style={{ width: "100%" }}>
          <Animated.View
            style={[
              styles.flipCard,
              styles.card,

              {
                transform: [
                  {
                    rotateY: flipAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <ChallengeCard user={users[userIndex]} />
          </Animated.View>
          <Animated.View
            style={[
              styles.flipCard,
              styles.flipCardBack,
              styles.card,
              {
                transform: [
                  {
                    rotateY: flipAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["180deg", "360deg"],
                    }),
                  },
                ],
                opacity: flipAnim.interpolate({
                  inputRange: [0, 0.5, 0.5],
                  outputRange: [0, 0, 1],
                }),
              },
            ]}
          >
            <ChallengeCard user={users[nextUserIndex]} />
          </Animated.View>
        </Animated.View>
        <View style={styles.actions}>
          <View style={[styles.circular, { width: `${calculateProgress()}%` as any }]} />
        </View>
      </View>
    </Tab>
  );
};

export default Goal;

const styles = StyleSheet.create({
  title: {
    color: "#fff",
  },
  circular: {
    borderRadius: 50,
    minWidth: 50,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "black",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    overflow: "hidden",
    width: "85%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#171717",
    backgroundColor: "#f0f0f0",
    padding: 2,
  },
  flipCard: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    zIndex: 20,
  },
  flipCardBack: {
    position: "absolute",
    backfaceVisibility: "hidden",
    zIndex: 10,
    top: 0,
  },
  card: {
    overflow: "hidden",
    width: "85%",
    height: 600,
    maxHeight: "80%",
    backgroundColor: "#f0f0f0",
    marginBottom: 0,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5.84,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#171717",
    padding: 0,
  },
  main: {
    paddingTop: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#6042f5",
  },
});
