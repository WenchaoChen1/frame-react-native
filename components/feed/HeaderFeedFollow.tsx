import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";


type Props = {
    onDiscoverPress: () => void;
    onFollowingPress: () => void;
}

export default function HeaderFeedFollow({onDiscoverPress, onFollowingPress}: Props) {

    const [isPressedDiscover,setIsPressedDiscover] = useState(true);

    return (
        <View style={styles.container}>
            {/* Discover 按钮 */}
            <TouchableOpacity
                style={[
                    styles.button,
                    isPressedDiscover && styles.buttonPressed, // 根据状态动态改变样式
                ]}
                onPress={() => {
                    console.log('Button Discover!');
                    setIsPressedDiscover(true); // 切换到 Discover 状态
                    onDiscoverPress();
                }}
            >
                <Text style={[styles.buttonText,isPressedDiscover && styles.buttonTextPressed]}>Discover</Text>
            </TouchableOpacity>


            <View style={styles.placeholder}></View>

            {/* Following 按钮 */}
            <TouchableOpacity
                style={[
                    styles.button,
                    !isPressedDiscover && styles.buttonPressed, // 根据状态动态改变样式
                ]}
                onPress={() => {
                    console.log('Button Following!');
                    setIsPressedDiscover(false); // 切换到 Following 状态
                    onFollowingPress();
                }}
            >
                <Text style={[styles.buttonText,!isPressedDiscover && styles.buttonTextPressed]}>Following</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15,
    },
    button: {
        backgroundColor: '#2F1F3F', // 默认背景颜色
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 25,
        flex:1,
        alignItems:"center",
    },
    buttonPressed: {
        backgroundColor: '#956EB7', // 按下时的背景颜色
        transform: [{ scale: 0.95 }], // 按下时缩小按钮
    },

    buttonText: {
        color: '#928999',
        fontSize: 14,
    },

    buttonTextPressed: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    placeholder:{
        width:10,
    }
})