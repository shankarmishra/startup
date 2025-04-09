import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import LinearGradient from "react-native-linear-gradient";
import * as ImagePicker from "react-native-image-picker";

const TournamentHostScreen = () => {
  const [banner, setBanner] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePickBanner = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
    });

    if (result.assets && result.assets.length > 0) {
      setBanner(result.assets[0].uri || null);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !location || !date || !banner) {
      Alert.alert("Error", "Please fill in all fields and upload a banner.");
      return;
    }

    // Submit the tournament details (e.g., send to API)
    Alert.alert("Success", "Tournament hosted successfully!");
  };

  return (
    <LinearGradient
      colors={["#000000", "#434343"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Host a Tournament</Text>

        {/* Banner Upload */}
        <TouchableOpacity style={styles.bannerUpload} onPress={handlePickBanner}>
          {banner ? (
            <Image source={{ uri: banner }} style={styles.bannerImage} />
          ) : (
            <Text style={styles.bannerText}>Upload Banner</Text>
          )}
        </TouchableOpacity>

        {/* Tournament Title */}
        <TextInput
          style={styles.input}
          placeholder="Tournament Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />

        {/* Tournament Description */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tournament Description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Tournament Location */}
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
        />

        {/* Tournament Date */}
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {date
              ? date.toLocaleDateString()
              : "Select Tournament Date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={["#28A745", "#218838"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitButtonGradient}
          >
            <Text style={styles.submitButtonText}>Host Tournament</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default TournamentHostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  bannerUpload: {
    width: "100%",
    height: 200,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  bannerText: {
    color: "#CCCCCC",
    fontSize: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 10,
    color: "#333333",
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  datePicker: {
    width: "100%",
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  submitButton: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  submitButtonGradient: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});