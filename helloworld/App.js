import {StatusBar} from 'expo-status-bar';
import {StyleSheet, TextInput, Text, View, Image, Pressable} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useState} from "react";
import TextOutput from "./TextOutput";

export default function App() {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>aaaaaaaaaaaaaaaaaa</Text>
            <Pressable onPress={() => window.setText = setText}>
                <Image source={{uri: "https://rustacean.net/assets/rustacean-flat-happy.png"}}
                       style={{width: 300, height: 200}}/>
            </Pressable>
            <TextInput placeholder="enter.." onChangeText={setText}
                       style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
            <TextOutput text={text}/>
            <View style={{flexDirection: 'row'}}>
                <Ionicons name='md-checkmark-circle' size={32} color='green'/>
                <Ionicons name='md-checkmark-circle' size={32} color='red'/>
                <Ionicons name='md-checkmark-circle' size={32} color='blue'/>
                <StatusBar style="auto"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
