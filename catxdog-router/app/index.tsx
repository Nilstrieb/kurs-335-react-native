import {Redirect} from "expo-router";
import {MaxEntitiesProvider} from "../components/MaxEntities";

const Index = () => {
    return (
        <Redirect href="/cats"/>
    );
};

export default Index;