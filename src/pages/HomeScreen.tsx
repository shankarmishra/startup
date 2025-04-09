import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const API_BASE_URL = "https://sportsbackend-n2xb.onrender.com/api/tournaments";

// Define the type for a tournament
type Tournament = {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  banner: string;
};

const HomeScreen = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]); // Use the defined type
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        Alert.alert("Error", "Failed to load tournaments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <LinearGradient
      colors={["#000000", "#434343"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Top Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Home</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image
            source={require("../assets/image1.png")}
            style={styles.heroImage}
          />
          <Text style={styles.heroText}>Welcome Back, Player!</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for players or tournaments"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Upcoming Tournaments Section */}
        <Text style={styles.sectionTitle}>Upcoming Tournaments</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        ) : tournaments.length === 0 ? (
          <Text style={styles.emptyText}>No tournaments available.</Text>
        ) : (
          <View style={styles.tournamentList}>
            {tournaments.map((tournament) => (
              <View key={tournament._id} style={styles.tournamentCard}>
                <Image
                  source={{ uri: tournament.banner }}
                  style={styles.tournamentImage}
                />
                <View style={styles.tournamentDetails}>
                  <Text style={styles.tournamentTitle}>{tournament.title}</Text>
                  <Text style={styles.tournamentDate}>
                    {new Date(tournament.date).toLocaleDateString()}
                  </Text>
                  <TouchableOpacity style={styles.tournamentButton}>
                    <LinearGradient
                      colors={["#000000", "#FFFFFF"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.tournamentButtonGradient}
                    >
                      <Text style={styles.tournamentButtonText}>View Details</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  heroBanner: {
    alignItems: "center",
    marginVertical: 20,
  },
  heroImage: {
    width: width * 0.9,
    height: 150,
    resizeMode: "cover",
    borderRadius: 15,
  },
  heroText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 25,
    color: "#333333",
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#333333",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginTop: 20,
  },
  tournamentList: {
    paddingHorizontal: 20,
  },
  tournamentCard: {
    backgroundColor: "#333333",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  tournamentImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  tournamentDetails: {
    padding: 15,
  },
  tournamentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  tournamentDate: {
    fontSize: 14,
    color: "#CCCCCC",
    marginBottom: 10,
  },
  tournamentButton: {
    alignSelf: "flex-start",
  },
  tournamentButtonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  tournamentButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
});
