import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";

const API_BASE_URL = "https://sportsbackend-n2xb.onrender.com/api/users";

type User = {
  id: string;
  name: string;
  coins: number;
  topDays: number; // Number of days the user has stayed at the top
};

const LeaderBoard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/leaderboard`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        Alert.alert("Error", "Failed to fetch leaderboard. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <View style={[styles.row, index === 0 && styles.topPlayerRow]}>
      <Text style={[styles.rank, index === 0 && styles.topRank]}>{index + 1}</Text>
      <Text style={[styles.name, index === 0 && styles.topName]}>
        {item.name} {index === 0 && "🏆"}
      </Text>
      <Text style={[styles.coins, index === 0 && styles.topCoins]}>{item.coins} Coins</Text>
      {index === 0 && (
        <Text style={styles.topDays}>
          {item.topDays} {item.topDays === 1 ? "Day" : "Days"} on Top
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : users.length === 0 ? (
        <Text style={styles.emptyText}>No leaderboard data available.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerText}>Rank</Text>
              <Text style={styles.headerText}>Name</Text>
              <Text style={styles.headerText}>Coins</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Black background for dark theme
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF", // White for title
  },
  loadingText: {
    fontSize: 16,
    color: "#CCCCCC", // Light gray for loading text
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#CCCCCC", // Light gray for empty state
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#555555", // Subtle border for header
    backgroundColor: "#222222", // Darker gray for header background
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White for header text
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#222222", // Darker gray for row background
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topPlayerRow: {
    backgroundColor: "#444444", // Slightly lighter gray for top player
    borderWidth: 1,
    borderColor: "#FFD700", // Gold border for top player
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // White for rank
    width: "15%",
    textAlign: "center",
  },
  name: {
    fontSize: 16,
    color: "#CCCCCC", // Light gray for name
    fontWeight: "500",
    width: "40%",
    textAlign: "left",
  },
  coins: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28A745", // Green for coins
    width: "25%",
    textAlign: "right",
  },
  topRank: {
    color: "#FFD700", // Gold for top rank
  },
  topName: {
    color: "#FFD700", // Gold for top name
  },
  topCoins: {
    color: "#FFD700", // Gold for top coins
  },
  topDays: {
    fontSize: 14,
    color: "#FFD700", // Gold for top days
    marginTop: 5,
    textAlign: "center",
  },
});
