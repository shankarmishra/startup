import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

type Match = {
  id: string;
  opponent: string;
  date: string;
  time: string;
  status: "upcoming" | "completed";
  location: string;
};

const IndexPage = () => {
  const matches: Match[] = [
    {
      id: "1",
      opponent: "Bob",
      date: "2025-04-06",
      time: "10:00 AM",
      status: "upcoming",
      location: "City Stadium",
    },
    {
      id: "2",
      opponent: "Alice",
      date: "2025-04-01",
      time: "5:00 PM",
      status: "completed",
      location: "Community Court",
    },
    {
      id: "3",
      opponent: "David",
      date: "2025-04-07",
      time: "8:00 AM",
      status: "upcoming",
      location: "Green Sports Arena",
    },
    {
      id: "4",
      opponent: "John",
      date: "2025-03-28",
      time: "3:00 PM",
      status: "completed",
      location: "Downtown Gym",
    },
  ];

  // Filter matches into upcoming and completed
  const upcomingMatches = matches.filter((m) => m.status === "upcoming");
  const completedMatches = matches.filter((m) => m.status === "completed");

  const renderMatchCard = (match: Match) => (
    <View key={match.id} style={styles.card}>
      <Text style={styles.matchTitle}>VS {match.opponent}</Text>
      <Text style={styles.matchInfo}>📍 {match.location}</Text>
      <Text style={styles.matchInfo}>
        🗓️ {match.date} at {match.time}
      </Text>
      <Text
        style={[
          styles.matchStatus,
          match.status === "upcoming" ? styles.upcomingStatus : styles.completedStatus,
        ]}
      >
        {match.status.toUpperCase()}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🏠 My Matches</Text>

      {/* Upcoming Matches */}
      <Text style={styles.sectionTitle}>🕑 Upcoming Matches</Text>
      {upcomingMatches.length === 0 ? (
        <Text style={styles.empty}>No upcoming matches.</Text>
      ) : (
        <FlatList
          data={upcomingMatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderMatchCard(item)}
          scrollEnabled={false} // Prevent FlatList from scrolling independently
        />
      )}

      {/* Completed Matches */}
      <Text style={styles.sectionTitle}>✅ Completed Matches</Text>
      {completedMatches.length === 0 ? (
        <Text style={styles.empty}>No completed matches.</Text>
      ) : (
        <FlatList
          data={completedMatches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderMatchCard(item)}
          scrollEnabled={false} // Prevent FlatList from scrolling independently
        />
      )}
    </ScrollView>
  );
};

export default IndexPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000000", // Black background for dark theme
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF", // White for heading
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#FFFFFF", // White for section titles
  },
  card: {
    backgroundColor: "#333333", // Dark gray for card background
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White for match title
  },
  matchInfo: {
    fontSize: 14,
    marginTop: 4,
    color: "#CCCCCC", // Light gray for match info
  },
  matchStatus: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "bold",
  },
  upcomingStatus: {
    color: "#007BFF", // Blue for upcoming matches
  },
  completedStatus: {
    color: "#28A745", // Green for completed matches
  },
  empty: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#CCCCCC", // Light gray for empty state
    marginBottom: 10,
  },
});
