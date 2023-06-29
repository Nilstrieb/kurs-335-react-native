import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import Login from "./Login";
import { StatusBar } from "expo-status-bar";
import { useToken } from "./auth-context";
import useAsyncStorage from "../service/use-async-storage";
import { JoinedList } from "../service/shopping-list-service";
import SimpleShoppingList, { AddProductCallback } from "./SimpleShoppingList";
import Header from "./header";
import AddItemModal from "./AddItemModal";

const Root = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(true);
  const { user, setUser } = useToken();
  const [isAddingItem, setIsAddingItem] = useState<null | {
    callback: AddProductCallback;
  }>(null);

  const [lists, setLists] = useAsyncStorage<JoinedList[]>("shopping-lists", [
    { id: "TEST1", token: "0097bbaf-3331-4c1d-8ba9-63db06949a54" },
    { id: "TEST2", token: "1097bbaf-3331-4c1d-8ba9-63db06949a54" },
  ]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <Header
        username={user?.username}
        onUserClick={() => {
          if (user) {
            setUser(null);
          } else {
            setLoginModalVisible(true);
          }
        }}
      />
      <View style={styles.container}>
        {user ? (
          <>
            <View>
              <FlatList
                data={lists}
                renderItem={(list) => (
                  <SimpleShoppingList
                    listId={list.item.id}
                    joinedList={list.item}
                    onAddItem={(callback) => setIsAddingItem({ callback })}
                  />
                )}
              />
            </View>

            <AddItemModal
              visible={!!isAddingItem}
              onClose={(list) => {
                setIsAddingItem(null);
                if (list && isAddingItem) {
                  isAddingItem.callback(list);
                }
              }}
            />
          </>
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
