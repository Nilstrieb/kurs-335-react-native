import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { Listener } from "expo-sensors/build/DeviceSensor";

const StepCounter = () => {
  const [data, setData] = useState(0);
  const [steps, setSteps] = useState({ count: 0, isStepping: false });

  const updateAcc: Listener<AccelerometerMeasurement> = useCallback(
    (m) => {
      const totalAcceleration = Math.abs(
        Math.sqrt(m.x ** 2 + m.y ** 2 + m.z ** 2)
      );
      setData(totalAcceleration);

      setSteps(({ count, isStepping }) => {
        if (isStepping && totalAcceleration < 1.05) {
          return { count, isStepping: false };
        } else if (!isStepping && totalAcceleration > 1.2) {
          return { count: count + 1, isStepping: true };
        }

        return { count, isStepping };
      });
    },
    [setSteps]
  );

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(updateAcc);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.box}>
      <Text style={styles.steps}>{steps.count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  steps: {
    fontSize: 100,
  },
});

export default StepCounter;
