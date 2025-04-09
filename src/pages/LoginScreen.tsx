import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { GoogleSignin, SignInSuccessResponse } from "@react-native-google-signin/google-signin";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { CommonActions } from '@react-navigation/native'; 

const API_BASE_URL = "https://sportsbackend-n2xb.onrender.com/api/users";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
  const [gesturePath, setGesturePath] = useState<number[][]>([]); // Track gesture points

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "224260340820-11tdkfvrhg8t5o0gfid0m3fqk5qaqj7i.apps.googleusercontent.com",
    });
  }, []);

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
      await AsyncStorage.setItem("userToken", token);
      navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Main" }],
              })
            ); // Navigate to the BottomTabs navigator
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred";
      Alert.alert("Login Failed", errorMessage);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !phone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        phone,
      });

      Alert.alert("Success", "Account registered successfully");
      setIsRegister(false); // Switch to login after registration
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred";
      Alert.alert("Registration Failed", errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset your password.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
        email,
      });

      Alert.alert(
        "Password Reset",
        `A password reset link has been sent to ${email}. Please check your inbox.`
      );
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred";
      Alert.alert("Password Reset Failed", errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Check if the response is successful and contains idToken
      if ("idToken" in userInfo && userInfo.idToken) {
        console.log("Google Login Success:", userInfo);

        const idToken = userInfo.idToken;

        const response = await axios.post(`${API_BASE_URL}/google-login`, {
          idToken,
        });

        const { token } = response.data;
        await AsyncStorage.setItem("userToken", token);
        navigation.replace("Home");
      } else {
        Alert.alert("Google Login Cancelled", "The login process was cancelled.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      Alert.alert("Google Login Failed", "An error occurred during Google login.");
    }
  };

  const handleGesture = (event: any) => {
    const { x, y } = event.nativeEvent;
    setGesturePath((prev) => [...prev, [x, y]]);
  };

  const handleGestureEnd = () => {
    // Check if the gesture matches a "Z" pattern
    if (isZPattern(gesturePath)) {
      Alert.alert("Hidden Pattern Detected", "Navigating to Coach Login...");
      navigation.navigate("CoachLogin");
    }
    setGesturePath([]); // Reset the gesture path
  };

  const isZPattern = (path: number[][]): boolean => {
    if (path.length < 3) return false;

    const [start, middle, end] = [path[0], path[Math.floor(path.length / 2)], path[path.length - 1]];

    // Check if the gesture resembles a "Z" shape
    const isDiagonal1 = middle[0] > start[0] && middle[1] > start[1];
    const isDiagonal2 = end[0] > middle[0] && end[1] < middle[1];

    return isDiagonal1 && isDiagonal2;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleGesture} onEnded={handleGestureEnd}>
        <LinearGradient
          colors={["#000000", "#FFFFFF"]} // Black to white gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          {/* App Icon */}
          <View style={styles.appIconContainer}>
            <Image source={require("../assets/app.png")} style={styles.appIcon} />
            <Text style={styles.appName}>GameSathi</Text>
          </View>

          <Text style={styles.title}>{isRegister ? "Register" : "Login"}</Text>

          {isRegister ? (
            <>
              {/* Registration Fields */}
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                placeholderTextColor="#999"
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                onChangeText={setPhone}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                placeholderTextColor="#999"
                onChangeText={setEmail}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!passwordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </>
          ) : (
            <>
              {/* Login Fields */}
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                placeholderTextColor="#999"
                onChangeText={setEmail}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#999"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={isRegister ? handleRegister : handleLogin}
          >
            <LinearGradient
              colors={["#000000", "#434343"]} // Black gradient for button
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>{isRegister ? "Register" : "Login"}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
              <FontAwesome name="google" size={20} color="#DB4437" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={20} color="#4267B2" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
            <Text style={styles.toggleText}>
              {isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  appIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF", // White for app name
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // White for title
    marginBottom: 20,
  },
  input: {
    width: "85%",
    height: 50, // Consistent height for all input boxes
    backgroundColor: "#FFFFFF", // White background for input fields
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333", // Dark gray for input text
    borderWidth: 1,
    borderColor: "#E0E0E0", // Light gray border
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%", // Same width as the input box
    height: 50, // Same height as the input box
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0", // Light gray border
    backgroundColor: "#FFFFFF", // Match the background color
  },
  passwordInput: {
    flex: 1, // Take up the remaining space in the row
    paddingHorizontal: 15, // Match the padding of the input style
    fontSize: 16,
    color: "#333", // Dark gray for input text
  },
  eyeIcon: {
    marginRight: 15, // Add spacing between the icon and the edge
  },
  button: {
    width: "85%",
    height: 50,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // White text for buttons
    fontSize: 18,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  toggleText: {
    color: "#FFFFFF", // White for toggle text
    fontSize: 16,
    marginTop: 15,
    textDecorationLine: "underline",
  },
  forgotPasswordText: {
    color: "#007BFF", // Blue for forgot password text
    fontSize: 14,
    marginBottom: 15,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginRight: "7.5%",
  },
});
