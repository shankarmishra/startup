import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Image source={require("../assets/image.png")} style={styles.image} />
      <Text style={styles.title}>Player Finder</Text>
      <Text style={styles.subtitle}>Connect with local athletes</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  image: { width: 250, height: 250, marginBottom: 20, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 30 },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, width: "80%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
