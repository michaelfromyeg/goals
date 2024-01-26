import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Goal from "./screens/Goal";
import JoinGoal from "./screens/JoinGoal";
import Login from "./screens/Login";
import SetGoal from "./screens/SetGoal";

const Stack = createStackNavigator();

const Main: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SetGoal" component={SetGoal} />
      <Stack.Screen name="JoinGoal" component={JoinGoal} />
      <Stack.Screen name="Goal" component={Goal} />
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

export default App;
