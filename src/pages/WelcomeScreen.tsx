import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Welcome">;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#000000", "#434343"]} // Black to dark gray gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Transparent background image */}
        <Image source={require("../assets/image.png")} style={styles.image} />
        <Text style={styles.title}>Player Finder</Text>
        <Text style={styles.subtitle}>
          Connect with local athletes and explore sports activities near you.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <LinearGradient
          colors={["#434343", "#000000"]} // Dark gray to black gradient for button
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    marginTop: height * 0.1, // Add spacing from the top
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain", // Ensures the image fits without distortion
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // White for title
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC", // Light gray for subtitle
    marginHorizontal: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "85%",
    marginBottom: 30, // Add spacing from the bottom
  },
  buttonGradient: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // White text for buttons
    fontSize: 18,
    fontWeight: "bold",
  },
});
