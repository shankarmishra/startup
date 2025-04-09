import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://sportsbackend-n2xb.onrender.com/api/users";

const ProfileScreen = ({ navigation }: any) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteGames, setFavoriteGames] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState("");
  const [achievements, setAchievements] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const {
        name,
        email,
        profileImage,
        favoriteGames = [],
        skillLevel,
        achievements = [],
      } = response.data;

      setUsername(name);
      setEmail(email);
      setProfileImage(profileImage);
      setFavoriteGames(favoriteGames);
      setSkillLevel(skillLevel);
      setAchievements(achievements);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      Alert.alert("Error", "Failed to load profile data.");
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await axios.put(
        `${API_BASE_URL}/profile`,
        { name: username, email, profileImage, favoriteGames, achievements },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsEditing(false);
      Alert.alert("Profile Updated", "Your profile has been successfully updated.");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.replace("Login");
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View style={styles.container}>
        {/* Profile Image */}
        <TouchableOpacity onPress={() => Alert.alert("Feature not implemented yet!")}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../assets/profile.png")
            }
            style={styles.profileImage}
          />
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        {/* User Info */}
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </>
        ) : (
          <>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
          </>
        )}

        {/* Favorite Games */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favorite Games</Text>
          {favoriteGames.map((game, index) => (
            <Text key={index} style={styles.gameText}>
              {game}
            </Text>
          ))}
        </View>

        {/* Skill Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skill Level</Text>
          <Text style={styles.skillLevel}>{skillLevel}</Text>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement, index) => (
            <Text key={index} style={styles.achievementText}>
              🎖️ {achievement}
            </Text>
          ))}
        </View>

        {/* Update Profile Button */}
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveText}>Save Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.updateText}>Update Profile</Text>
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  changePhotoText: {
    color: "#007BFF",
    fontSize: 14,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#CCCCCC",
    marginBottom: 20,
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  section: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  gameText: {
    fontSize: 16,
    color: "#CCCCCC",
    marginBottom: 5,
  },
  skillLevel: {
    fontSize: 16,
    color: "#CCCCCC",
  },
  achievementText: {
    fontSize: 16,
    color: "#FFD700",
    marginBottom: 5,
  },
  updateButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  updateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF3A3A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
