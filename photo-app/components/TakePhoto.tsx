import React, { useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";

type Props = {
  onClose: (uri: string | null) => void;
  visible: boolean;
};

const TakePhoto = ({ onClose, visible }: Props) => {
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

  const takePicture = async () => {
    console.log("taking picture");
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
      console.log("taken");
      onClose(photo.uri);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose(null)}
    >
      {permission ? (
        <Camera type={type} style={styles.camera} ref={camera}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
              <Text style={styles.text}>Flip camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.button}>
              <Text style={styles.text}>Take picture</Text>
            </TouchableOpacity>
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
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default TakePhoto;
