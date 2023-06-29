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
      <Text>{list.name}</Text>
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
    borderColor: "grey",
    borderRadius: 2,
    borderWidth: 1,
    padding: 5,
  },
  productBox: {
    margin: 10,
  },
});

export default SimpleShoppingList;
