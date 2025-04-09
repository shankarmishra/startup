import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";

const LoadingAnimation = ({ visible }: { visible: boolean }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <LottieView
          source={require("../assets/Animation - 1743938602370.json")} // Lottie animation file
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    </Modal>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  },
  animation: {
    width: 200,
    height: 200,
  },
});