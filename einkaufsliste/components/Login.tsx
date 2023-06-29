import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useToken } from "./auth-context";
import { login, register } from "../service/auth-service";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const Login = ({ visible, onClose }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useToken();
  const onRegister = () => {
    setError(null);
    register(username, password)
      .then((res) => {
        if (res === "username-exists-already") {
          setError("Username already exists");
        } else {
          setUser({ token: res.token, username });
          onClose();
        }
      })
      .catch((e) => {
        console.error(e);
        setError("An error occurred, try again.");
      });
  };
  const onLogin = () => {
    setError(null);
    login(username, password)
      .then((res) => {
        if (!res) {
          setError("Username or password incorrect");
        } else {
          setUser({ token: res.token, username });
          onClose();
        }
      })
      .catch((e) => {
        console.error(e);
        setError("An error occurred, try again.");
      });
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.loginModal}>
        <Text style={styles.title}>Login/Register</Text>
        <View style={styles.inputBox}>
          <Text>Username</Text>
          <TextInput placeholder="Enter username" onChangeText={setUsername} />
        </View>
        <View style={styles.inputBox}>
          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Enter password"
            onChangeText={setPassword}
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.buttonBox}>
          <Button onPress={onLogin} title="Login" />
          <Button onPress={onRegister} title="Register" />
          <Button onPress={onClose} title="Close" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loginModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  inputBox: {
    padding: 10,
  },
  buttonBox: {
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
  button: {
    padding: 5,
    backgroundColor: "lightblue",
    height: 50,
  },
  error: {
    color: "red",
    margin: 10,
  },
});

export default Login;
