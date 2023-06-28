import React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import data from "./data.json";

type Person = (typeof data)[0];

data.sort((a, b) => a.birthdayyear - b.birthdayyear);

const byYear = new Map<number, Person[]>();
data.forEach((person) => {
  const people = byYear.get(person.birthdayyear);
  if (!people) {
    byYear.set(person.birthdayyear, [person]);
  } else {
    people.push(person);
  }
});
const dataAsSections = Array.from(byYear.entries()).map(([title, data]) => ({
  title,
  data,
}));

const PersonSectionList = () => {
  const renderItem = ({ item: person }: { item: Person }) => (
    <View style={styles.box}>
      <Text>
        {person.firstname} {person.lastname}
      </Text>
      <Text style={styles.email}>{person.email}</Text>
      <Text style={styles.countryZip}>
        {person.country} {person.zip}
      </Text>
    </View>
  );

  return (
    <View style={styles.outer}>
      <SectionList
        stickySectionHeadersEnabled
        sections={dataAsSections}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionheader}>{section.title}</Text>
        )}
      />
    </View>
  );
};

export default PersonSectionList;

const styles = StyleSheet.create({
  sectionheader: {
    backgroundColor: "white",
  },
  outer: {
    width: "90%",
  },
  box: {
    width: "100%",
    padding: 5,
    paddingBottom: 20,
    paddingLeft: 10,
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
