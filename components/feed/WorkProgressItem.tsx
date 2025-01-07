import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import {ImageSource} from "expo-image";

type WorkProgressItemProps = {
    //avatar : ImageSource;
    titleName:string;

    plays:number
    coins:number
    onCancelClick : () => void
    onItemClick:()=>void
}

// 单个卡片组件
export default function  WorkProgressItem({titleName,plays,coins,onCancelClick,onItemClick }: WorkProgressItemProps) {

    return (
        <TouchableOpacity onPress={onItemClick}>
            <View style={styles.card} >
                {/* 左边：头像 */}
                <Image
                    source={require("@/assets/images/background-image.png")} // 头像 URL
                    style={styles.avatar}
                />

                {/* 中间：标题和描述 */}
                <View style={styles.textContainer}>
                    <Text style={styles.titleName}>{titleName}</Text>
                    <View style={styles.iconContainer}>
                        <View style={styles.playIcon}>
                            <Image
                                style={styles.play}
                                source={require("@/assets/images/play.png")}/>
                            <Text style={styles.latestDraft}>{plays} plays</Text>
                        </View>

                        <View style={styles.icon}>
                            <Image
                                style={styles.play}
                                source={require("@/assets/images/coins.png")}/>
                            <Text style={styles.latestDraft}>{coins} Tune Coins</Text>
                        </View>
                    </View>

                </View>

                {/* 右边：取消 */}
                <TouchableOpacity style={styles.cancelButton} onPress={onCancelClick}>
                    <Image
                        style={styles.cancelImage}
                        source={require("@/assets/images/right-more.png")}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

    card: {
        marginTop:10,
        padding:16,
        backgroundColor:'#171717',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:15,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 7,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    titleName: {
        fontSize: 16,
        marginBottom: 4,
        color: 'white',
    },
    latestDraft: {
        fontSize: 12,
        color: '#7F7779',
    },
    cancelButton: {
        padding: 8,
    },
    cancelImage:{
      width: 18,
      height: 18,
    },

    play:{
        width: 15,
        height: 15,
        marginRight:7
    },
    iconContainer:{
        marginTop:6,
        flexDirection: 'row',
        flex:1,
        justifyContent: 'center',
    },

    playIcon:{
        flex: 1/2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon:{
        marginLeft:12,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
    }
});