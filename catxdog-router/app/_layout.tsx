import {Stack} from "expo-router";
import {MaxEntitiesProvider} from "../components/MaxEntities";

export default function HomeLayout() {
    return (
        <MaxEntitiesProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "blue",
                    },
                    headerTintColor: "white",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Welcome",
                    }}
                />
            </Stack>
        </MaxEntitiesProvider>
    );
}