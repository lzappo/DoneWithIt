import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
        style={{
          width: 400,
          height: 400,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    position: "absolute",
    backgroundColor: "white",
    height: "100%",
    justifyContent: "center",
    opacity: 0.8,
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
