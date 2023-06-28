import {Stack} from "expo-router";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {useMaxEntities} from "../../../components/MaxEntities";

const Settings = () => {
    const {setMax} = useMaxEntities();

    return (
        <View>
            <Stack.Screen options={{title: "Settings"}}/>
            <View style={styles.itemContainer}>
                <Text style={styles.nameText}>Max amount of cats/dogs</Text>
                <TextInput placeholder='100' onChangeText={(text) => {
                    console.log(text);
                    const max = Number(text);
                    if (!Number.isNaN(max)) {
                        console.log("max")
                        setMax(max);
                    }
                }}/>
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 10,
        marginLeft: 16,
    },
    textContainer: {
        marginLeft: 16,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});