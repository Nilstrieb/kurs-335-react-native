import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  username: string | undefined;
  onUserClick: () => void;
};

const Header = ({ username, onUserClick }: Props) => {
  return (
    <View style={styles.box}>
      <Text>einkaufsliste</Text>
      <Text>{username}</Text>
      <TouchableOpacity onPress={onUserClick}>
        <AntDesign
          name={username !== undefined ? "deleteuser" : "adduser"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 40,
    backgroundColor: "lightblue",
    padding: 5,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default Header;
