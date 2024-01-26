export type DayLog = {
  day: Date;
  users: { [userid: string]: UserDayLog };
};

export type UserDayLog = {
  photoUrl: string;
  status: DayActionStatus;
};

export type DayActionStatus = "Done" | "Undone" | "Pending";

export type Challenge = {
  name: string;
  deadline: Date;
  buyIn: number;
  users: UserGoal[];
};

export type User = {
  id: string;
  name: string;
  image: string;
};

export type UserGoal = {
  id: string;
  goal: string;
};
