import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

type Props = {
    onMoreClick: () => void;
}

export default function FollowCard({onMoreClick}: Props) {
    return (
            <View style={styles.card}>
                {/* 左边：头像 */}
                <Image
                    source={require("@/assets/images/follow-default-avatar.png")} // 头像 URL
                    style={styles.avatar}
                />

                {/* 中间：标题和描述 */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>People who follow you back</Text>
                    <Text style={styles.description}>See all your friends</Text>
                </View>

                {/* 右边：查看更多的按钮 */}
                <TouchableOpacity style={styles.moreButton} onPress={onMoreClick}>
                    <Image
                        style={{width:15,height:15}}
                        source={require("@/assets/images/right-arrow.png")} // 头像 URL
                    />
                </TouchableOpacity>
            </View>

    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1822',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'white',
    },
    description: {
        fontSize: 12,
        color: '#7F7779',
    },
    moreButton: {
        alignItems: 'flex-end',
    },

});