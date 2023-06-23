import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  icon: any;
  label: string;
  onPress: () => void;
};

const IconButton = ({ icon, label, onPress }: Props) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#FFFFFF" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#FFFFFF",
    marginTop: 12,
  },
});

export default IconButton;
