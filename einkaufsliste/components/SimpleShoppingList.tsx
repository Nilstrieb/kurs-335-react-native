import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  deleteProduct,
  editProduct,
  getList,
  JoinedList,
  Product,
  ShoppingList,
} from "../service/shopping-list-service";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  listId: string;
  joinedList: JoinedList;
};

const SimpleShoppingList = ({ listId, joinedList }: Props) => {
  const [list, setList] = useState<ShoppingList | null>(null);

  const refetch = useCallback(() => {
    getList(listId)
      .then((fetched) => setList(fetched))
      .catch((e) => console.error(e));
  }, [listId]);

  useEffect(() => {
    refetch();
  }, [listId, refetch]);

  const onProductCompletion = (product: Product, completed: boolean) => {
    const newProduct = { ...product, completed };
    editProduct(joinedList, newProduct)
      .then((list) => setList(list))
      .catch(console.error);
  };

  const onProductDelete = (product: Product) => {
    deleteProduct(listId, product.id)
      .then((list) => setList(list))
      .catch(console.error);
  };

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
            <View>
              <Text>
                {item.name}, {item.quantity}
              </Text>
              <Text>
                {item.location} by {item.requester}
              </Text>
            </View>
            <View style={styles.productIconBox}>
              <BouncyCheckbox
                isChecked={item.completed}
                onPress={(isChecked) => onProductCompletion(item, isChecked)}
              />
              <TouchableOpacity onPress={() => onProductDelete(item)}>
                <FontAwesome name="trash-o" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 5,
    width: 400,
  },
  listName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    borderColor: "grey",
    borderBottomWidth: 1,
  },
  productIconBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default SimpleShoppingList;
