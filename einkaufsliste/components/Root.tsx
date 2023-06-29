import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Login from "./Login";
import { StatusBar } from "expo-status-bar";
import { useToken } from "./auth-context";
import useAsyncStorage from "../service/use-async-storage";
import { JoinedList } from "../service/shopping-list-service";
import SimpleShoppingList from "./SimpleShoppingList";
import Header from "./header";

const Root = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(true);
  const { token, setToken } = useToken();
  const [lists, setLists] = useAsyncStorage<JoinedList[]>("shopping-lists", [
    { id: "TEST1", token: "0097bbaf-3331-4c1d-8ba9-63db06949a54" },
    { id: "TEST2", token: "1097bbaf-3331-4c1d-8ba9-63db06949a54" },
  ]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Header
        loggedIn={!!token}
        onUserClick={() => {
          if (token) {
            setToken(null);
          } else {
            setLoginModalVisible(true);
          }
        }}
      />
      <View style={styles.container}>
        {token ? (
          <View>
            <FlatList
              data={lists}
              renderItem={(list) => (
                <SimpleShoppingList
                  listId={list.item.id}
                  joinedList={list.item}
                />
              )}
            />
          </View>
        ) : (
          <Login
            onClose={() => setLoginModalVisible(false)}
            visible={loginModalVisible}
          />
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: 50,
    backgroundColor: "#fff",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default Root;
