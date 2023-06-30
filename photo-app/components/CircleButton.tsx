import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CircleButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.circleButtonContainer}>
      <TouchableOpacity style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292E" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    borderWidth: 4,
    borderColor: "#FFD33D",
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#FFFFFF",
  },
});

export default CircleButton;
