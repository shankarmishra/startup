import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./src/pages/WelcomeScreen";
import LoginScreen from "./src/pages/LoginScreen";
import CoachLogin from "./src/pages/CoachLogin";
import BottomTabs from "./src/nav/BottomTabs";
import CoachNav from "./src/nav/coachnav";

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAppState = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");
        const userToken = await AsyncStorage.getItem("userToken");
        const userType = await AsyncStorage.getItem("userType");

        if (!isFirstLaunch) {
          await AsyncStorage.setItem("isFirstLaunch", "false");
          setInitialRoute("Welcome");
        } else if (userToken && userType === "user") {
          setInitialRoute("Main");
        } else if (userToken && userType === "coach") {
          setInitialRoute("MainCoach");
        } else {
          setInitialRoute("Login");
        }
      } catch (error) {
        console.error("Error checking app state:", error);
        setInitialRoute("Login");
      }
    };

    checkAppState();
  }, []);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CoachLogin" component={CoachLogin} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="MainCoach" component={CoachNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
