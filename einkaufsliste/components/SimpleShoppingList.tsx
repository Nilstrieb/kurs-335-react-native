import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getList, ShoppingList } from "../service/shopping-list-service";

type Props = {
  listId: string;
};

const SimpleShoppingList = ({ listId }: Props) => {
  const [list, setList] = useState<ShoppingList | null>(null);

  useEffect(() => {
    getList(listId)
      .then((fetched) => setList(fetched))
      .catch((e) => console.error(e));
  }, [listId]);

  if (!list) {
    return (
      <View style={styles.box}>
        <Text>Loading {listId}</Text>
      </View>
    );
  }

  return (
    <View style={styles.box}>
      <Text style={styles.listName}>{list.name}</Text>
      <FlatList
        data={list.products}
        renderItem={({ item }) => (
          <View style={styles.productBox}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 5,
  },
  listName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productBox: {
    margin: 10,
    borderColor: "grey",
    borderBottomWidth: 1,
  },
});

export default SimpleShoppingList;
