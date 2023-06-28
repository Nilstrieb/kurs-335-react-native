import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import data from "./data.json";

const PersonList = () => {
  return (
    <View style={styles.outer}>
      <FlatList
        data={data}
        renderItem={({ item: person }) => (
          <View style={styles.box}>
            <Text>
              {person.firstname} {person.lastname}
            </Text>
            <Text style={styles.email}>{person.email}</Text>
            <Text style={styles.year}>{person.birthdayyear}</Text>
            <Text style={styles.countryZip}>
              {person.country} {person.zip}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PersonList;

const styles = StyleSheet.create({
  outer: {
    width: "90%",
  },
  box: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    width: "100%",
    padding: 5,
    paddingBottom: 10,
  },
  headerLine: {
    flex: 1,
    flexDirection: "row",
  },
  year: {
    position: "absolute",
    right: 10,
  },
  email: {
    fontSize: 12,
  },
  countryZip: {
    paddingTop: 10,
  },
});
