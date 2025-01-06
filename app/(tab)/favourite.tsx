import {StyleSheet, Text, View} from "react-native";
import React from "react";

export default function FavouriteScreen() {
    return <View style={styles.container}>
        <Text style={styles.title}>
            Favourite screen
        </Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },

    title:{
        fontSize: 64,
        fontWeight: "bold",
        color: "#38434D",
    }


})
