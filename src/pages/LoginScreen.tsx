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
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "224260340820-11tdkfvrhg8t5o0gfid0m3fqk5qaqj7i.apps.googleusercontent.com",
    });
  }, []);

  const handleLogin = async () => {
    if (email === "test@example.com" && password === "password") {
      await AsyncStorage.setItem("userToken", "dummy-token");
      navigation.replace("Home");
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("Google User Info:", userInfo);
      await AsyncStorage.setItem("userToken", "dummy-token");
      navigation.replace("Home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === statusCodes.SIGN_IN_CANCELLED) {
          Alert.alert("Google Login Cancelled");
        } else if (error.message === statusCodes.IN_PROGRESS) {
          Alert.alert("Google Login In Progress");
        } else if (error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert("Google Play Services Not Available");
        } else {
          Alert.alert("Google Login Failed", error.message);
        }
      }
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
      if (result.isCancelled) {
        Alert.alert("Facebook Login Cancelled");
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          Alert.alert("Facebook Login Failed", "Something went wrong obtaining access token");
        } else {
          console.log("Facebook Access Token:", data.accessToken.toString());
          navigation.replace("Home");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Facebook Login Failed", error.message);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#FF6A00", "#FF3A75", "#9146FF", "#3F51B5"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* App Icon in Top-Left */}
      <View style={styles.appIconContainer}>
        <View style={styles.appIconCircle}>
          <Image
            source={require("../assets/app.png")}
            style={styles.appIcon}
          />
        </View>
        <Text style={styles.appName}>GameSathi</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={email}
        placeholderTextColor="#999"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUp}>New user? Sign up</Text>
      </TouchableOpacity>
    </LinearGradient>
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
    position: "absolute",
    top: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  appIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensures the image stays within the circle
  },
  appIcon: {
    width: "100%", // Ensures the image fills the circle
    height: "100%",
    resizeMode: "contain", // Keeps the aspect ratio of the image
  },
  appName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  input: {
    width: "80%",
    height: 45,
    backgroundColor: "#FFFFFFDD",
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  loginText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  socialButton: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 3,
  },
  socialText: {
    fontWeight: "600",
    color: "#333",
  },
  signUp: {
    color: "#FFFFFF",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
