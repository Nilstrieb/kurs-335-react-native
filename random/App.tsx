import { StyleSheet, Text, View } from "react-native";
import StepCounter from "./parts/steps/StepCounter";
import Magnets from "./parts/magnets/Magnets";

export default function App() {
  return (
    <View style={styles.container}>
      <Magnets />
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
