import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WelcomeScreen from "./src/pages/WelcomeScreen";
import LoginScreen from "./src/pages/LoginScreen";
import BottomTabs from "./src/nav/BottomTabs";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAppState = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const firstLaunch = await AsyncStorage.getItem("isFirstLaunch");

      setIsLoggedIn(!!userToken);
      setIsFirstLaunch(firstLaunch === null);
      if (firstLaunch === null) {
        await AsyncStorage.setItem("isFirstLaunch", "false");
      }
      setIsLoading(false);
    };

    checkAppState();
  }, []);

  if (isLoading) {
    return null; // Show a loading screen or spinner if needed
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
