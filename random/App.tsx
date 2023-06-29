import { StyleSheet, View } from "react-native";
import PersonSectionList from "./parts/person-list/PersonSectionList";
import PersonList from "./parts/person-list/PersonList";
import PicsumList from "./parts/person-list/PicsumList";

export default function App() {
  return (
    <View style={styles.container}>
      <PicsumList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
});
