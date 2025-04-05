import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";

const ProfileScreen = ({ navigation }: any) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [favoriteGames, setFavoriteGames] = useState([
    "Football",
    "Tennis",
    "Basketball",
  ]);
  const [skillLevel, setSkillLevel] = useState("Intermediate");

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      quality: 1,
    });

    if (result.didCancel) {
      Alert.alert("Cancelled", "Image selection was cancelled.");
    } else if (result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri || null);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={handleImagePicker}>
        <Image
        //   source={
        //     profileImage
        //       ? { uri: profileImage }
        //       : require("../assets/default-profile.png")
        //   }
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      {/* User Info */}
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>

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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    alignItems: "center",
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
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  gameText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  skillLevel: {
    fontSize: 16,
    color: "#555",
  },
  logoutButton: {
    backgroundColor: "#FF3A3A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});