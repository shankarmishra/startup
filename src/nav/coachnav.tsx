import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import CoachDashboard from "../pages/CoachDashboard";
import TournamentHostScreen from "../pages/tournamentHostScreen";
import ProfileScreen from "../pages/CoachProfileScreen";
import MyTournamentsScreen from "../pages/MyTournamentsScreen";

export type CoachTabParamList = {
  Dashboard: undefined;
  TournamentHostScreen: undefined;
  Profile: undefined;
  MyTournaments: undefined; // ✅ Added this to match your Tab.Screen
};

const Tab = createBottomTabNavigator<CoachTabParamList>();

const CoachNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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

          switch (route.name) {
            case "Dashboard":
              iconName = "grid-outline";
              break;
            case "TournamentHostScreen":
              iconName = "add-circle-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
            case "MyTournaments":
              iconName = "trophy-outline";
              break;
            default:
              iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={CoachDashboard} />
      <Tab.Screen name="TournamentHostScreen" component={TournamentHostScreen} />
      <Tab.Screen name="MyTournaments" component={MyTournamentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default CoachNav;
