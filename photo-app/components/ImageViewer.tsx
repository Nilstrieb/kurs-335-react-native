import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

export const IMAGE_HEIGHT = 440;
export const IMAGE_WIDTH = 320;

const ImageViewer = ({
  placeholderImg,
  selectedImgUri,
}: {
  placeholderImg: ImageSourcePropType;
  selectedImgUri: string | null;
}) => {
  const image =
    selectedImgUri !== null ? { uri: selectedImgUri } : placeholderImg;

  return <Image style={styles.image} source={image} />;
};

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 18,
  },
});

export default ImageViewer;
