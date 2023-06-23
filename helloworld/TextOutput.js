import React from 'react';
import {View, Text} from 'react-native'

const TextOutput = ({text}) => {
    return (
        <View>
            <Text style={{backgroundColor: "lightgreen", fontSize: 20}}>
                {text}
            </Text>
        </View>
    );
};

export default TextOutput;