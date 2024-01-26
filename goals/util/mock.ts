import { Challenge, DayLog, User, UserGoal } from "./types";

const users: User[] = [
  {
    id: "1",
    name: "Jacob",
    image:
      "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Emily",
    image:
      "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const days: DayLog[] = [
  {
    day: new Date(2025, 4, 12),
    users: {
      "1": {
        photoUrl:
          "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "Done",
      },
      "2": {
        photoUrl:
          "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "Pending",
      },
    },
  },

  {
    day: new Date(2025, 4, 13),
    users: {
      "1": {
        photoUrl:
          "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "Done",
      },
      "2": {
        photoUrl:
          "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        status: "Undone",
      },
    },
  },
];

const userGoals: UserGoal[] = [
  {
    id: "1",
    goal: "Run 5km",
  },
  {
    id: "2",
    goal: "Do 100 pushups",
  },
];

const challenge: Challenge = {
  name: "2024",
  deadline: new Date(2025, 4, 14),
  buyIn: 10,
  users: userGoals,
};

export const MOCK = {
  users: users,
  days: days,
  challenge: challenge,
};
