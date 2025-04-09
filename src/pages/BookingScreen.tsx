import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
  ActivityIndicator,
  Modal,
  Image,
 PermissionsAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation"; // Import Geolocation API
import LottieView from "lottie-react-native"; // Import LottieView

const API_BASE_URL = "https://sportsbackend-n2xb.onrender.com/api/nearby-players";

const games = ["Badminton", "Football", "Cricket", "Volleyball", "Tennis"];

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location to find nearby players.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const BookingScreen = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS !== "ios") {
      setShowTimePicker(false);
    }
    if (date) {
      setSelectedTime(date);
    }
  };

  const handleFindPlayers = async () => {
    if (!selectedGame) {
      Alert.alert("Error", "Please select a game.");
      return;
    }
    if (!selectedTime) {
      Alert.alert("Error", "Please select a time.");
      return;
    }
    if (!location) {
      Alert.alert("Error", "Please enter a location.");
      return;
    }

    // Request location permission
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Location permission is required to find players.");
      return;
    }

    // Show loading animation
    setIsLoading(true);

    // Get user's current location
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Simulate a 3-second delay for the map scanning animation
        setTimeout(async () => {
          try {
            const response = await axios.post(`${API_BASE_URL}/notify`, {
              latitude,
              longitude,
              game: selectedGame,
              time: selectedTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              address: location,
            });

            setIsLoading(false);
            Alert.alert(
              "Players Found",
              `Found ${response.data.players.length} players for ${selectedGame} at ${location}.`
            );
          } catch (error) {
            setIsLoading(false);
            const errorMessage =
              axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : "An error occurred while finding players.";
            Alert.alert("Error", errorMessage);
          }
        }, 3000);
      },
      (error) => {
        setIsLoading(false);
        Alert.alert("Error", "Failed to get your location. Please enable location services.");
        console.error("Geolocation Error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <LinearGradient
      colors={["#000000", "#434343"]} // Black to dark gray gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Book a Game</Text>
      <Text style={styles.description}>
        Select your favorite game, choose a time, and find players near you to
        join the fun!
      </Text>

      {/* Select Game Section */}
      <Text style={styles.label}>Select Game</Text>
      <View style={styles.gameContainer}>
        {games.map((game) => (
          <TouchableOpacity
            key={game}
            style={[
              styles.gameButton,
              selectedGame === game && styles.selectedGameButton,
            ]}
            onPress={() => setSelectedGame(game)}
          >
            <Text
              style={[
                styles.gameButtonText,
                selectedGame === game && styles.selectedGameButtonText,
              ]}
            >
              {game}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Select Time Section */}
      <Text style={styles.label}>Select Time</Text>
      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.timeText}>
          {selectedTime
            ? selectedTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Select Time"}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
      )}

      {/* Location Section */}
      <Text style={styles.label}>Enter Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        placeholderTextColor="#999"
        value={location}
        onChangeText={setLocation}
      />

      {/* Find Players Button */}
      <TouchableOpacity style={styles.findButton} onPress={handleFindPlayers}>
        <LinearGradient
          colors={["#28A745", "#218838"]} // Green gradient for button
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.findButtonGradient}
        >
          <Text style={styles.findText}>Find Players</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Loading Animation */}
      <Modal visible={isLoading} transparent animationType="fade">
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../assets/Animation - 1743937407216.json")} // Lottie animation file
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
          <Text style={styles.loadingText}>Scanning for players...</Text>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // White for title
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#CCCCCC", // Light gray for description
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF", // White for labels
    marginBottom: 10,
  },
  gameContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gameButton: {
    backgroundColor: "#333333", // Dark gray for unselected buttons
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
  },
  selectedGameButton: {
    backgroundColor: "#007BFF", // Blue for selected buttons
  },
  gameButtonText: {
    fontSize: 16,
    color: "#CCCCCC", // Light gray for unselected text
  },
  selectedGameButtonText: {
    color: "#FFFFFF", // White for selected text
    fontWeight: "bold",
  },
  timeButton: {
    backgroundColor: "#333333", // Dark gray for button
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    color: "#FFFFFF", // White for time text
  },
  input: {
    backgroundColor: "#FFFFFF", // White for input background
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 8,
    color: "#333333", // Dark gray for input text
    fontSize: 16,
    marginBottom: 20,
  },
  findButton: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  findButtonGradient: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  findText: {
    color: "#FFFFFF", // White for button text
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 18,
    color: "#FFFFFF", // White for loading text
    fontWeight: "bold",
    marginTop: 20,
  },
});
