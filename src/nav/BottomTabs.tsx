import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../pages/HomeScreen";
import BookingScreen from "../pages/BookingScreen";
import LeaderBoard from "../pages/LeaderBoard";
import IndexScreen from "../pages/IndexScreen";
import ProfleScreen from "../pages/ProfileScreen";

const Tab = createBottomTabNavigator();

// Placeholder Screens (Move to separate files if needed)
const BookingsScreen = () => <BookingScreen />;
const InboxScreen = () => <IndexScreen />;
const ProfileScreen = () => <ProfleScreen />;
const LeaderboardScreen = () => <LeaderBoard />;

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // Neutral white background
          borderTopLeftRadius: 15, // Rounded corners
          borderTopRightRadius: 15,
          height: 65, // Adjusted height for better usability
          paddingBottom: 8,
          paddingTop: 8,
          position: "absolute", // Floating effect
          marginHorizontal: 10,
          elevation: 5, // Shadow for Android
          shadowColor: "#000", // Shadow for iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: "#007BFF", // Active icon color (blue)
        tabBarInactiveTintColor: "#6C757D", // Inactive icon color (gray)
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          // Assign icons based on route name
          if (route.name === "Home") {
            iconName = "home-outline"; // Home icon
          } else if (route.name === "Bookings") {
            iconName = "location-outline"; // Location icon for Bookings
          } else if (route.name === "Inbox") {
            iconName = "chatbubble-outline"; // Inbox icon
          } else if (route.name === "Profile") {
            iconName = "person-outline"; // Profile icon
          } else if (route.name === "Leaderboard") {
            iconName = "trophy-outline"; // Leaderboard icon
          } else {
            iconName = "help-outline"; // Default icon for undefined routes
          }

          // Return the Ionicons component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
