import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the tournament type
interface Tournament {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  banner: string;
  hostedBy: string;
  teams?: any[]; // Optional: You can further define the team structure if needed
}

const MyTournamentsScreen = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        const response = await fetch(
          "https://sportsbackend-n2xb.onrender.com/api/tournaments/my/tournaments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const renderTournament = ({ item }: { item: Tournament }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.details}>Date: {new Date(item.date).toDateString()}</Text>
      <Text style={styles.details}>Location: {item.location}</Text>
      <Text style={styles.details}>Teams: {item.teams?.length || 0}</Text>
    </View>
  );

  if (loading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f39c12" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tournaments</Text>
      <FlatList
        data={tournaments}
        renderItem={renderTournament}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={styles.empty}>No tournaments found.</Text>
        }
      />
    </View>
  );
};

export default MyTournamentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#2c3e50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    color: "#f39c12",
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    color: "#ecf0f1",
    fontSize: 14,
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    color: "#bdc3c7",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
