import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../pages/HomeScreen";
import BookingScreen from "../pages/BookingScreen";
import LeaderBoard from "../pages/LeaderBoard";
import IndexScreen from "../pages/IndexScreen";
import ProfileScreen from "../pages/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Set the default screen
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          position: "absolute",
          marginHorizontal: 10,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#CCCCCC",
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Bookings") {
            iconName = "location-outline";
          } else if (route.name === "Leaderboard") {
            iconName = "trophy-outline";
          } else if (route.name === "Inbox") {
            iconName = "chatbubble-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else {
            iconName = "help-outline"; // Default icon for unexpected cases
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderBoard} />
      <Tab.Screen name="Inbox" component={IndexScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
