import { StatusBar } from "expo-status-bar";
import { ImageSourcePropType, Platform, StyleSheet, View } from "react-native";
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
import domtoimage from "dom-to-image";
import TakePhoto from "./components/TakePhoto";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const imageRef = useRef<any>();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | null>(
    null
  );
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // This counter increases every time the emoji sticker should be reset
  const [emojiStickerResetCounter, setEmojiStickerResetCounter] = useState(0);
  const [cameraShown, setCameraShown] = useState(false);

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
    try {
      if (Platform.OS === "web") {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });
        const link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } else {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved image");
        }
      }
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
            theme="primary"
            label="Take a photo"
            onPress={() => setCameraShown(true)}
          />
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
      <TakePhoto
        onClose={(uri) => {
          setCameraShown(false);
          if (uri) {
            setSelectedImage(uri);
            setShowAppOptions(true);
          }
        }}
        visible={cameraShown}
      />
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
