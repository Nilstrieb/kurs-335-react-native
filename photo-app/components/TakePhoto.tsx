import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import CircleButton from "./CircleButton";

type Props = {
  onClose: (uri: string | null) => void;
  visible: boolean;
};

const TakePhoto = ({ onClose, visible }: Props) => {
  const { width } = useWindowDimensions();
  const cameraHeight = Math.round((width * 16) / 9);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const camera = useRef<Camera>(null);

  if (!permission) {
    requestPermission();
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = () => {
    console.log("taking picture");
    if (camera.current) {
      camera.current
        .takePictureAsync()
        .then(({ uri }) => {
          console.log("taken");
          onClose(uri);
        })
        .catch(console.error);
    }
  };

  console.log(cameraHeight, width);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose(null)}
    >
      {permission ? (
        <Camera
          type={type}
          style={[styles.camera, { height: cameraHeight }]}
          ref={camera}
          ratio="16:9"
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.circleButtonContainer}
            >
              <Text style={styles.text}>Take picture</Text>
            </TouchableOpacity>
            <View>
              <Text>aaaaaaaaObb</Text>
            </View>
          </View>
        </Camera>
      ) : (
        <Text>No permissions for the camera.</Text>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    height: 100,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    margin: 64,
    borderWidth: 4,
    borderColor: "#00ff16",
  },
  circleButtonContainer: {
    width: 84,
    borderWidth: 4,
    borderColor: "#FFD33D",
    borderRadius: 42,
    padding: 3,
  },
  button: {
    borderWidth: 4,
    borderColor: "red",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default TakePhoto;
