import { StatusBar } from "expo-status-bar";
import {
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImageViewer, {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const imageRef = useRef<any>();
  const [status, requestPermission] = MediaLibrary.usePermissions({
    writeOnly: true,
  });
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(
    null
  );
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // This counter increases every time the emoji sticker should be reset
  const [emojiStickerResetCounter, setEmojiStickerResetCounter] = useState(0);

  if (status === null) {
    requestPermission();
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [IMAGE_WIDTH, IMAGE_HEIGHT],
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("No image selected");
    }
  };

  const onReset = () => setShowAppOptions(false);
  const onAddSticker = () => setIsModalVisible(true);
  const onSaveImage = async () => {
    if (Platform.OS === "web") {
      alert("saving is not supported on the web");
    }
    try {
      const localUri = await captureRef(imageRef, { height: 440, quality: 1 });
      await MediaLibrary.saveToLibraryAsync(localUri);
    } catch (e) {
      console.error(e);
    }
  };
  const onModalClose = () => setIsModalVisible(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImg={PlaceholderImage}
            selectedImgUri={selectedImage}
          />
          {pickedEmoji !== null ? (
            <EmojiSticker
              imageSize={40}
              stickerSource={pickedEmoji}
              currentResetCounter={emojiStickerResetCounter}
            />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImage} />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList
          onSelect={(emoji) => {
            setPickedEmoji(emoji);
            setEmojiStickerResetCounter((c) => c + 1);
          }}
          onCloseModal={onModalClose}
        />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
