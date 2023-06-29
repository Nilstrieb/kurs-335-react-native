import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addProduct,
  Product,
  ShoppingList,
} from "../service/shopping-list-service";

type Props = {
  visible: boolean;
  onClose: (item: Product | null) => void;
};

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const AddItemModal = ({ visible, onClose }: Props) => {
  const [name, setName] = useState("");
  const [requester, setRequester] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");

  const onCreate = () => {
    const product = {
      id: "",
      name,
      requester,
      location,
      quantity,
      completed: false,
    };
    onClose(product);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => onClose(null)}
    >
      <View style={styles.inputGroup}>
        <Text>Name</Text>
        <TextInput placeholder="enter name" onChangeText={setName} />
      </View>
      <View style={styles.inputGroup}>
        <Text>Requester</Text>
        <TextInput placeholder="enter requester" onChangeText={setRequester} />
      </View>
      <View style={styles.inputGroup}>
        <Text>Location</Text>
        <TextInput placeholder="enter location" onChangeText={setLocation} />
      </View>
      <View style={styles.inputGroup}>
        <Text>Quantity</Text>
        <TextInput placeholder="enter quantity" onChangeText={setQuantity} />
      </View>
      <View style={styles.buttonBox}>
        <Button onPress={onCreate} title="Create" />
        <Button onPress={() => onClose(null)} title="Close" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputGroup: {},
  button: {
    padding: 5,
    backgroundColor: "lightblue",
    height: 50,
  },
  buttonBox: {
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
});

export default AddItemModal;
