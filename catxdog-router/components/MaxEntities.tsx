import React, {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MaxEntities = {
    max: number,
    setMax: (max: number) => void,
}

const MaxEntitiesContext = React.createContext<MaxEntities>({
    max: 100, setMax: (max: number) => {
        console.log("DEFAULT SET MAX", max)
    }
});

function MaxEntitiesProvider({children}: { children: JSX.Element | JSX.Element[] }) {
    const [maxEntities, setMaxEntities] = useState(100);

    useEffect(() => {
        AsyncStorage.getItem('max-entities').then(value => {
            if (!Number.isNaN(Number(value))) {
                setMaxEntities(Number(value));
            }
        }).catch(() => {
        });
    }, []);

    const value = {
        max: maxEntities,
        setMax: (max: number) => {
            console.log("Setting max", max);
            AsyncStorage.setItem('max-entities', String(max)).then(() => setMaxEntities(max));
        }
    };

    return (
        <MaxEntitiesContext.Provider value={value}>
            {children}
        </MaxEntitiesContext.Provider>
    )
}

function useMaxEntities(): MaxEntities {
    return useContext(MaxEntitiesContext);
}

export {MaxEntitiesProvider, useMaxEntities};