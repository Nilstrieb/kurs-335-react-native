import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/src/DeviceSensor";
import { Listener } from "expo-sensors/build/DeviceSensor";

const StepCounter = () => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [steps, setSteps] = useState({ count: 0, isStepping: false });

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const updateAcc: Listener<AccelerometerMeasurement> = useCallback(
    (m) => {
      setData(m);

      const totalAcceleration = Math.sqrt(m.x ** 2 + m.y ** 2 + m.z ** 2);

      console.log(totalAcceleration);

      setSteps(({ count, isStepping }) => {
        if (isStepping && totalAcceleration < 1) {
          return { count, isStepping: false };
        } else if (!isStepping && totalAcceleration > 1.1) {
          return { count: count + 1, isStepping: true };
        }

        return { count, isStepping };
      });
    },
    [setSteps]
  );

  const subscribe = useCallback(() => {
    setSubscription(Accelerometer.addListener(updateAcc));
  }, [setSubscription, updateAcc]);

  const unsubscribe = useCallback(() => {
    if (subscription) {
      subscription.remove();
    }
    setSubscription(null);
  }, [subscription, setSubscription]);

  useEffect(() => {
    subscribe();
    return unsubscribe;
  }, [subscribe, unsubscribe]);

  return (
    <View>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
      <Text>
        steps: {steps.count} {steps.isStepping}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StepCounter;
