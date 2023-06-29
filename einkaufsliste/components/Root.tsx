import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Login from "./Login";
import { StatusBar } from "expo-status-bar";
import { useToken } from "./auth-context";

const Root = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(true);
  const { token, setToken } = useToken();

  return (
    <View style={styles.container}>
      {token ? (
        <View>
          <Pressable onPress={() => setToken(null)}>
            <Text>Logout</Text>
          </Pressable>
          <Text>congrats, you have a token: {token}</Text>
        </View>
      ) : (
        <>
          <Pressable onPress={() => setLoginModalVisible(true)}>
            <Text>login</Text>
          </Pressable>
          <Login
            onClose={() => setLoginModalVisible(false)}
            visible={loginModalVisible}
          />
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
});

export default Root;
