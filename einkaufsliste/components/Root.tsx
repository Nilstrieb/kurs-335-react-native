import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Login from "./Login";
import { StatusBar } from "expo-status-bar";
import { useToken } from "./auth-context";
import useAsyncStorage from "../service/use-async-storage";
import { JoinedList } from "../service/shopping-list-service";
import SimpleShoppingList from "./SimpleShoppingList";

const Root = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(true);
  const { token, setToken } = useToken();
  const [lists, setLists] = useAsyncStorage<JoinedList[]>("shopping-lists", [
    { id: "TEST1", token: "0097bbaf-3331-4c1d-8ba9-63db06949a54" },
    { id: "TEST2", token: "1097bbaf-3331-4c1d-8ba9-63db06949a54" },
  ]);

  return (
    <View style={styles.container}>
      {token ? (
        <View>
          <Pressable onPress={() => setToken(null)}>
            <Text>Logout</Text>
          </Pressable>
          <Text>congrats, you have a token: {token}</Text>
          <FlatList
            data={lists}
            renderItem={(list) => <SimpleShoppingList listId={list.item.id} />}
          />
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
