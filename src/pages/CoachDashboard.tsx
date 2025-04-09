import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CoachTabParamList } from "../nav/CoachNav";


type DashboardNavProp = NativeStackNavigationProp<CoachTabParamList, "Dashboard">;

const CoachDashboard = () => {
  const navigation = useNavigation<DashboardNavProp>();

  return (
    <LinearGradient
      colors={["#000000", "#434343"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Coach Dashboard</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TournamentHostScreen")}
        >
          <Text style={styles.buttonText}>Create Tournament</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dashboard Options</Text>
          <TouchableOpacity
  style={styles.optionButton}
  onPress={() => navigation.navigate("MyTournaments")}
>
  <Text style={styles.optionText}>View My Tournaments</Text>
</TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Manage Players</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>View Notifications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};


export default CoachDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f39c12",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    backgroundColor: "#2c3e50",
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    color: "#ecf0f1",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: "#34495e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});

