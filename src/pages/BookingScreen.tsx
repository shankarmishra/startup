import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const games = ["Badminton", "Football", "Cricket", "Volleyball", "Tennis"];

const BookingScreen = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS !== "ios") {
      setShowTimePicker(false);
    }
    if (date) {
      setSelectedTime(date);
    }
  };

  const handleFindPlayers = () => {
    if (!selectedGame) {
      Alert.alert("Error", "Please select a game.");
      return;
    }
    if (!selectedTime) {
      Alert.alert("Error", "Please select a time.");
      return;
    }
    Alert.alert(
      "Finding Players",
      `Looking for players to play ${selectedGame} at ${selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    );
    // Navigate or call backend API to find matching players
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Game</Text>

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

      {/* Find Players Button */}
      <TouchableOpacity style={styles.findButton} onPress={handleFindPlayers}>
        <Text style={styles.findText}>Find Players</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FF5733",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  gameContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gameButton: {
    backgroundColor: "#EEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
  },
  selectedGameButton: {
    backgroundColor: "#007BFF",
  },
  gameButtonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedGameButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  timeButton: {
    backgroundColor: "#EEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  findButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  findText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
