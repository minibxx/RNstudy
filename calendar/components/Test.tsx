import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Test = () => {
    
    return(
        <>
            테스트입니다
            <TouchableOpacity 
                    onPress={ pressBtn}
                    style={styles.plus}>
                    +
                  </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    plus: {
        color: 'red';
    }
})

export default Test;

