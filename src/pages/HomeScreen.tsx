import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#F5F5F5"]} // White to light gray gradient background
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView>
        {/* Header */}
        <Text style={styles.title}>Welcome Back, Player!</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for players or sports"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Running Challenge Card */}
        <View style={styles.challengeCard}>
          <Text style={styles.cardTitle}>Running Challenge</Text>
          <Text style={styles.cardSubtitle}>Distance: 15.5 km</Text>
          <Text style={styles.cardSubtitle}>Calories: 150 kcal</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Go to</Text>
          </TouchableOpacity>
        </View>

        {/* Metrics Section */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>07:30</Text>
            <Text style={styles.metricLabel}>Sleep</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>150 ml</Text>
            <Text style={styles.metricLabel}>Drink</Text>
          </View>
        </View>

        {/* Sports Categories */}
        <Text style={styles.sectionTitle}>Sports Categories</Text>
        <View style={styles.sportsContainer}>
          <TouchableOpacity style={styles.sportButton}>
            <Text style={styles.sportButtonText}>Soccer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sportButton}>
            <Text style={styles.sportButtonText}>Basketball</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sportButton}>
            <Text style={styles.sportButtonText}>Tennis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sportButton}>
            <Text style={styles.sportButtonText}>Running</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1C1C1E", // Dark gray for text
    textAlign: "center",
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light gray for input background
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 25,
    color: "#1C1C1E", // Dark gray for input text
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#1C1C1E", // Dark gray for button
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 20,
    color: "#FFFFFF", // White for button text
  },
  challengeCard: {
    backgroundColor: "#FFFFFF", // White for card background
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1E", // Dark gray for card title
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#666", // Medium gray for card subtitle
    marginBottom: 5,
  },
  cardButton: {
    backgroundColor: "#1C1C1E", // Dark gray for button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  cardButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White for button text
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: "#F5F5F5", // Light gray for metric card
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "45%",
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1C1C1E", // Dark gray for metric value
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 16,
    color: "#666", // Medium gray for metric label
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1E", // Dark gray for section title
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sportsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  sportButton: {
    backgroundColor: "#FFFFFF", // White for sport button
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    width: "40%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sportButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1C1C1E", // Dark gray for sport button text
  },
});
