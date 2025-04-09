import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from '@react-navigation/native';   
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CoachTabParamList } from "../nav/CoachNav"; // Adjust the import path as necessary


const API_BASE_URL = "https://sportsbackend-n2xb.onrender.com/api/coaches";

const CoachAuthScreen = ({ navigation }: any) => {
  const [isRegister, setIsRegister] = useState(true); // Toggle between register/login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !phone || !specialization || !experience) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        phone,
        specialization,
        experience,
      });

      Alert.alert("Success", "Coach registered successfully");
      setIsRegister(false); // Switch to login after registering
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setSpecialization("");
      setExperience("");
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred during registration";
      Alert.alert("Registration Failed", errorMessage);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      const { token } = response.data;
      Alert.alert("Success", "Logged in successfully");
      await AsyncStorage.setItem("userToken", token); // Save token for authentication
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainCoach" }],
        })
      ); // Reset navigation stack to the CoachNav
 // Navigate to the Dashboard inside CoachNav
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred during login";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <LinearGradient
      colors={["#000000", "#434343"]} // Black to dark gray gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>
        {isRegister ? "Coach Registration" : "Coach Login"}
      </Text>

      {isRegister && (
        <>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            placeholderTextColor="#999"
            onChangeText={setName}
          />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={phone}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
          <TextInput
            placeholder="Specialization (e.g., Soccer, Basketball)"
            style={styles.input}
            value={specialization}
            placeholderTextColor="#999"
            onChangeText={setSpecialization}
          />
          <TextInput
            placeholder="Years of Experience"
            style={styles.input}
            value={experience}
            placeholderTextColor="#999"
            keyboardType="numeric"
            onChangeText={setExperience}
          />
        </>
      )}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={isRegister ? handleRegister : handleLogin}
      >
        <Text style={styles.buttonText}>
          {isRegister ? "Register" : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text style={styles.toggleText}>
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CoachAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // White for title
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#FFFFFF", // White input background
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333", // Dark gray for input text
    borderWidth: 1,
    borderColor: "#E0E0E0", // Light gray border
  },
  button: {
    width: "85%",
    height: 50,
    backgroundColor: "#333333", // Dark gray for button
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF", // White text for buttons
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#CCCCCC", // Light gray for toggle text
    fontSize: 16,
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
