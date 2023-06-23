import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import {
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
  currentResetCounter: number;
};

const EmojiSticker = ({
  imageSize,
  stickerSource,
  currentResetCounter,
}: Props) => {
  const resetCounter = useSharedValue(currentResetCounter);
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  if (resetCounter.value !== currentResetCounter) {
    resetCounter.value = currentResetCounter;
    scaleImage.value = imageSize;
    translateX.value = 0;
    translateY.value = 0;
  }

  const onDrag: any = useAnimatedGestureHandler({
    onStart: (event, context: any) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context: any) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const onDoubleTap: any = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = scaleImage.value / 2;
      }
    },
  });
  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  }));
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, styles.stickerContainer]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={imageStyle}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  stickerContainer: {
    top: -350,
  },
});

export default EmojiSticker;
