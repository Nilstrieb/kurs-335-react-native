import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

const EmojiSticker = ({ imageSize, stickerSource }: Props) => {
  return (
    <View style={styles.stickerContainer}>
      <Image
        source={stickerSource}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stickerContainer: {
    top: -350,
  },
});

export default EmojiSticker;
