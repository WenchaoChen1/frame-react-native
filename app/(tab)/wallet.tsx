import {StyleSheet, Text, View} from "react-native";
import React from "react";

export default function WalletScreen() {
    return <View style={styles.container}>
        <Text style={styles.title}>
            Wallet screen
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
