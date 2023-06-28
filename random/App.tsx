import { StyleSheet, View } from "react-native";
import PersonList from "./parts/person-list/PersonList";

export default function App() {
  return (
    <View style={styles.container}>
      <PersonList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
});
