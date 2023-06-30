import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Magnetometer, MagnetometerMeasurement } from "expo-sensors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const zeroed = { x: 0, y: 0, z: 0 };

const AnimatedView = Animated.createAnimatedComponent(View);

const Magnets = () => {
  const { width } = Dimensions.get("window");

  const [magnet, setMagnet] = useState(zeroed);
  const [points, setPoints] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const targetTranslateX = useSharedValue(0);
  const targetTranslateY = useSharedValue(0);

  const placeTarget = () => {
    targetTranslateX.value = (Math.random() - 0.5) * width;
    targetTranslateY.value = (Math.random() - 0.5) * width;
  };

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));
  const targetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: targetTranslateX.value,
      },
      {
        translateY: targetTranslateY.value,
      },
    ],
  }));

  const onUpdate = (m: MagnetometerMeasurement) => {
    setMagnet(m);
    translateX.value = m.x;
    translateY.value = m.y;

    const deltaX = Math.abs(targetTranslateX.value - translateX.value);
    const deltaY = Math.abs(targetTranslateY.value - translateY.value);

    if (deltaX < 20 && deltaY < 20) {
      setPoints((p) => p + 1);
      placeTarget();
    }
  };

  useEffect(() => {
    const sub = Magnetometer.addListener(onUpdate);
    return () => sub.remove();
  });

  return (
    <View>
      <View style={styles.pointsBox}>
        <Text style={styles.points}>{points}</Text>
      </View>
      <View
        style={[styles.root, { width, height: width, borderRadius: width / 2 }]}
      >
        <AnimatedView style={[imageStyle, styles.circle]}></AnimatedView>
        <AnimatedView
          style={[targetStyle, styles.circle, styles.target]}
        ></AnimatedView>
      </View>
      <TouchableOpacity onPress={placeTarget} style={styles.reset}>
        <Text>RESET</Text>
      </TouchableOpacity>
      <View style={styles.details}>
        <Text>Magnetometer</Text>
        <View style={styles.detailsStats}>
          <Text>x: {magnet.x}</Text>
          <Text>y: {magnet.y}</Text>
          <Text>z: {magnet.z}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pointsBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  points: {
    fontSize: 30,
  },
  circle: {
    width: 40,
    height: 40,
    position: "absolute",
    borderRadius: 20,
    backgroundColor: "yellow",
    borderWidth: 2,
    borderColor: "red",
  },
  target: {
    borderWidth: 0,
    backgroundColor: "green",
  },
  reset: {
    margin: 30,
    padding: 10,
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  details: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsStats: {
    display: "flex",
    justifyContent: "flex-start",
    width: 200,
  },
});

export default Magnets;
